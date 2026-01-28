import nodemailer from 'nodemailer';
import { Document, Page, Text, View, StyleSheet, renderToStream } from '@react-pdf/renderer';

// IMPORTANT: Requires GMAIL_USER and GMAIL_APP_PASSWORD in env vars
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

// PDF Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FEFCF0',
        padding: 40,
        fontFamily: 'Helvetica',
    },
    card: {
        border: '4px dashed #FFD700',
        borderRadius: 20,
        padding: 30,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        color: '#ffdf33',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 40,
        textAlign: 'center',
    },
    vipBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        width: '100%',
        marginBottom: 20,
        border: '2px solid #FFF8E1',
    },
    label: {
        fontSize: 10,
        color: '#aaa',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    value: {
        fontSize: 24,
        color: '#5D4037',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 15,
        marginTop: 15,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#FFF8E1',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        color: '#5D4037',
        fontWeight: 'bold',
    },
    detailsBox: {
        marginTop: 20,
        backgroundColor: '#FFF8E1',
        padding: 15,
        borderRadius: 10,
        width: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        fontSize: 10,
        color: '#ddd',
        textTransform: 'uppercase',
        letterSpacing: 2,
    }
});

// PDF Component
const TicketPdf = ({ name, guests, companions, meat, drinks }: any) => (
    <Document>
        <Page size="A6" style={styles.page}>
            <View style={styles.card}>
                <Text style={styles.title}>Oba! Voce vai! 🎉</Text>
                <Text style={styles.subtitle}>Sua presenca foi confirmada.</Text>

                <View style={styles.vipBox}>
                    <Text style={styles.label}>Convidado VIP</Text>
                    <Text style={styles.value}>{name}</Text>

                    <View style={styles.row}>
                        <View style={styles.statBox}>
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.statValue}>{guests} Pessoas</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.label}>Data</Text>
                            <Text style={styles.statValue}>16/02</Text>
                        </View>
                    </View>
                </View>

                {guests > 1 && (
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={styles.label}>Acompanhantes</Text>
                        <Text style={{ fontSize: 12, color: '#555' }}>
                            {companions}
                        </Text>
                    </View>
                )}

                <View style={styles.detailsBox}>
                    <Text style={styles.label}>Sugestão para levar:</Text>
                    <Text style={{ fontSize: 12, color: '#555', marginTop: 5 }}>🍖 {meat} de Carne</Text>
                    <Text style={{ fontSize: 12, color: '#555' }}>🥤 {drinks} de Bebida</Text>
                </View>

                <Text style={styles.footer}>TICKET DIGITAL • ANIVERSARIO DA OLIVIA</Text>
            </View>
        </Page>
    </Document>
);

function generateEmailHtml(name: string, guests: number, companions: string, meat: string, drinks: string) {
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
                                <p class="stat-value">${guests} ${guests === 1 ? 'Pessoa' : 'Pessoas'}</p>
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

// Convert stream to buffer
const streamToBuffer = async (stream: any): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err: any) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
};

export async function POST(request: Request) {
    try {
        console.log("API Invoked");
        const body = await request.json();
        const { name, email, guests, companions, meat, drinks } = body;

        console.log("Payload received:", { name, email, guests });

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error("Missing Env Vars");
            throw new Error('Configuração de email ausente no servidor.');
        }

        const emailHtml = generateEmailHtml(name, guests, companions, meat, drinks);

        // Generate PDF
        console.log("Generating PDF...");
        const pdfStream = await renderToStream(
            <TicketPdf
                name={name}
                guests={guests}
                companions={companions}
                meat={meat}
                drinks={drinks}
            />
        );

        // Convert stream to Buffer to avoid type issues with Nodemailer
        console.log("Converting PDF to Buffer...");
        const pdfBuffer = await streamToBuffer(pdfStream);

        const mailOptions = {
            from: `"Aniversário da Olívia" <${process.env.GMAIL_USER}>`,
            to: `${email}, aniversariodaolivia1@gmail.com`,
            subject: `Confirmação VIP: ${name} no Aniversário da Olívia! 🌼`,
            html: emailHtml,
            attachments: [
                {
                    filename: 'Ingresso-Olivia.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
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
