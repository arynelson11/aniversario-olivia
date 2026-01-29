import nodemailer from 'nodemailer';

// IMPORTANT: Requires GMAIL_USER and GMAIL_APP_PASSWORD in env vars
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

function generateEmailHtml(name: string, guests: number, babies: number, children: number, companions: string, meat: string, drinks: string) {
    const childrenText = children === 1 ? 'Criança' : 'Crianças';
    const babiesText = babies === 1 ? 'Bebê' : 'Bebês';

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; background-color: #ffffff; }
            .container { background-color: #FEFCF0; border: 4px dashed rgba(255, 215, 0, 0.4); border-radius: 24px; margin: 40px auto; padding: 40px 20px; max-width: 480px; position: relative; }
            .heading { color: #FFD700; font-size: 32px; font-weight: bold; text-align: center; margin: 0 0 4px; }
            .subheading { color: rgba(93, 64, 55, 0.6); font-size: 14px; text-align: center; margin: 0 0 24px; }
            .card { background-color: #ffffff; border-radius: 16px; padding: 24px; border: 2px solid rgba(255, 215, 0, 0.1); }
            .label { color: rgba(93, 64, 55, 0.5); font-size: 10px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; margin: 0; }
            .value { color: #5D4037; font-size: 20px; font-weight: bold; margin: 4px 0 0; }
            .stat-box { background-color: rgba(255, 215, 0, 0.1); border-radius: 12px; padding: 12px; text-align: center; }
            .stat-value { color: #5D4037; font-size: 16px; font-weight: bold; margin: 0; }
            .footer { color: rgba(93, 64, 55, 0.3); font-size: 10px; text-align: center; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; margin-top: 32px; }
            .badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-right: 4px; }
            .badge-blue { background-color: #E3F2FD; color: #1565C0; }
            .badge-pink { background-color: #FCE4EC; color: #C2185B; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="heading">Oba! Você vai! 🎉</h1>
            <p class="subheading">Sua presença foi confirmada.</p>
            
            <div class="card">
                <div style="border-bottom: 1px solid rgba(93, 64, 55, 0.1); padding-bottom: 12px; margin-bottom: 12px;">
                    <p class="label">Convidado VIP</p>
                    <p class="value">${name}</p>
                </div>
                
                <table style="width: 100%; border-spacing: 0;">
                    <tr>
                        <td style="padding-right: 6px; width: 50%;">
                            <div class="stat-box">
                                <p class="label">Total</p>
                                <p class="stat-value">${guests + children + babies} Pessoas</p>
                            </div>
                        </td>
                        <td style="padding-left: 6px; width: 50%;">
                            <div class="stat-box">
                                <p class="label">Data</p>
                                <p class="stat-value">16/02</p>
                            </div>
                        </td>
                    </tr>
                </table>

                ${(children > 0 || babies > 0) ? `
                <div style="text-align: center; margin-top: 12px;">
                    ${children > 0 ? `<span class="badge badge-blue">${children} ${childrenText}</span>` : ''}
                    ${babies > 0 ? `<span class="badge badge-pink">${babies} ${babiesText}</span>` : ''}
                </div>
                ` : ''}

                ${guests > 1 ? `
                <div style="margin-top: 16px;">
                    <p class="label">Acompanhantes</p>
                    <p style="color: #5D4037; font-size: 14px; margin: 0;">${companions}</p>
                </div>
                ` : ''}

                <div style="margin-top: 16px; background-color: rgba(255, 215, 0, 0.1); padding: 10px; border-radius: 8px;">
                    <p class="label" style="margin-bottom: 4px;">Sugestão para levar:</p>
                    <p style="color: #5D4037; font-size: 14px; margin: 0;">🍖 ${meat} de Carne</p>
                    <p style="color: #5D4037; font-size: 14px; margin: 0;">🥤 ${drinks} de Bebida</p>
                </div>
            </div>

            <p class="footer">TICKET DIGITAL • ANIVERSÁRIO DA OLÍVIA</p>
        </div>
    </body>
    </html>
    `;
}

export async function POST(request: Request) {
    try {
        console.log("API Invoked");
        const body = await request.json();
        const { name, email, guests, babies, children, companions, meat, drinks } = body;

        console.log("Payload received:", { name, email, guests, babies, children });

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error("Missing Env Vars");
            throw new Error('Configuração de email ausente no servidor.');
        }

        const emailHtml = generateEmailHtml(name, guests, babies || 0, children || 0, companions, meat, drinks);

        const mailOptions = {
            from: `"Aniversário da Olívia" <${process.env.GMAIL_USER}>`,
            to: `${email}, aniversariodaolivia1@gmail.com`,
            subject: `Confirmação VIP: ${name} no Aniversário da Olívia! 🌼`,
            html: emailHtml,
        };

        console.log("Sending email...");
        const info = await transporter.sendMail(mailOptions) as any;
        console.log("Email sent:", info.messageId);

        return new Response(JSON.stringify({ message: "Email sent", messageId: info.messageId }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("Critical Error sending email:", error);
        return new Response(JSON.stringify({ error: error.message || "Failed to send email" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
