import { Resend } from 'resend';
import { TicketEmail } from '../src/emails/TicketEmail';

// IMPORTANT: Requires RESEND_API_KEY in environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, guests, companions, meat, drinks } = body;

        const data = await resend.emails.send({
            from: 'Aniversário da Olívia <onboarding@resend.dev>', // Default testing domain
            to: [email, 'aniversariodaolivia1@gmail.com'], // Send to guest AND birthday owner
            subject: `Confirmação: ${name} no Aniversário da Olívia! 🌼`,
            react: TicketEmail({
                name,
                guests: Number(guests),
                companions,
                meat,
                drinks
            }),
        });

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
