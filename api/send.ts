import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { TicketEmail } from '../src/emails/TicketEmail';

// IMPORTANT: Requires GMAIL_USER and GMAIL_APP_PASSWORD in env vars
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, guests, companions, meat, drinks } = body;

        // Render the React component to HTML
        const emailHtml = await render(TicketEmail({
            name,
            guests: Number(guests),
            companions,
            meat,
            drinks
        }));

        const mailOptions = {
            from: `"Aniversário da Olívia" <${process.env.GMAIL_USER}>`,
            to: `${email}, aniversariodaolivia1@gmail.com`, // Send to guest AND owner
            subject: `Confirmação VIP: ${name} no Aniversário da Olívia! 🌼`,
            html: emailHtml,
        };

        const info = await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: "Email sent", messageId: info.messageId }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: "Failed to send email" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
