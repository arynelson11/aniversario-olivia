import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function RSVP() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [guests, setGuests] = useState(1);
    const [ticketData, setTicketData] = useState<{ name: string, guests: number, companions: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        // Collect companion names
        const companions: string[] = [];
        for (let i = 0; i < guests - 1; i++) {
            const companionName = formData.get(`guest_${i + 1}`) as string;
            if (companionName) companions.push(companionName);
        }
        const companionsString = companions.length > 0 ? companions.join(', ') : "Nenhum";

        try {
            await fetch("https://formsubmit.co/ajax/aniversariodaolivia1@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "Nome do Convidado": name,
                    "Email de Contato": email,
                    "Total de Pessoas": `${guests}`,
                    "Acompanhantes": companionsString,
                    "Mensagem": message || "Sem mensagem",
                    _subject: `Nova Presença: ${name} + ${companions.length}`,
                    "🍖 Carne (kg)": `${(guests * 0.4).toFixed(1)}kg`,
                    "🥤 Bebida (L)": `${(guests * 0.8).toFixed(1)}L`,
                    _cc: email, // Send copy to guest
                    _template: "table",
                    _captcha: "false"
                })
            });
            setTicketData({ name, guests, companions: companionsString });
            setFormState('success');
        } catch (error) {
            console.error("Erro ao enviar:", error);
            alert("Ops! Houve um erro ao enviar. Por favor, tente novamente.");
            setFormState('idle');
        }
    };

    return (
        <section id="rsvp" className="relative z-10 py-24 px-4 bg-white/40 backdrop-blur-sm">
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {formState === 'success' && ticketData ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            className="bg-[#FEFCF0] p-8 rounded-3xl border-4 border-dashed border-primary/40 relative shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Daisy */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 spin-slow">
                                <img src="/daisy.png" alt="Daisy" className="w-full h-full object-contain opactiy-80" />
                            </div>

                            <div className="text-center mb-6">
                                <h3 className="font-heading text-3xl text-primary mb-1">Oba! Você vai! 🎉</h3>
                                <p className="text-text/60 text-sm">Sua presença foi confirmada.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-sm space-y-4 relative z-10">
                                <div className="flex items-center gap-3 text-left border-b border-primary/10 pb-3">
                                    <div className="bg-primary/20 p-2.5 rounded-full">
                                        <Send className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text/50 uppercase font-bold tracking-wider">Convidado VIP</p>
                                        <p className="font-heading text-xl text-text leading-tight">{ticketData.name}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center bg-primary/5 rounded-xl p-2">
                                        <p className="text-[10px] text-text/50 uppercase font-bold">Total</p>
                                        <p className="font-heading text-lg text-text">{ticketData.guests} {ticketData.guests === 1 ? 'Pessoa' : 'Pessoas'}</p>
                                    </div>
                                    <div className="text-center bg-primary/5 rounded-xl p-2">
                                        <p className="text-[10px] text-text/50 uppercase font-bold">Data</p>
                                        <p className="font-heading text-lg text-text">16/02</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center space-y-2">
                                <p className="text-text/60 text-xs">Enviamos uma cópia para seu email! 📧</p>
                                <p className="text-primary/40 text-[10px] uppercase tracking-[0.2em] font-bold">TICKET DIGITAL • ANIVERSÁRIO DA OLÍVIA</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-4 border-primary/20">
                            <h2 className="text-3xl md:text-4xl font-heading text-center mb-2 text-text">Presença</h2>
                            <p className="text-center text-text/60 mb-8">Por favor, confirme até 05/02/2026</p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-text mb-2 pl-2">Nome Completo</label>
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-background border-2 border-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-text placeholder-text/40 transition-colors"
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-text mb-2 pl-2">Seu Email (para receber o convite)</label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-background border-2 border-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-text placeholder-text/40 transition-colors"
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="guests" className="block text-sm font-bold text-text mb-2 pl-2">Total de Convidados (incluindo você)</label>
                                    <select
                                        id="guests"
                                        name="guests"
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                        className="w-full bg-background border-2 border-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-text transition-colors"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Pessoa' : 'Pessoas'}</option>
                                        ))}
                                    </select>

                                    {guests > 1 && (
                                        <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="block text-sm font-bold text-text pl-1">Nome dos Acompanhantes:</label>
                                            <div className="space-y-2">
                                                {[...Array(guests - 1)].map((_, index) => (
                                                    <input
                                                        key={index}
                                                        required
                                                        type="text"
                                                        name={`guest_${index + 1}`}
                                                        className="w-full bg-background/50 border-2 border-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-text placeholder-text/40 transition-colors text-sm"
                                                        placeholder={`Nome do Acompanhante ${index + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-primary/10 p-4 rounded-xl mt-4 border-2 border-primary/20">
                                        <p className="font-heading text-lg text-text mb-2">🍖 Sugestão para levar (Churrasco):</p>
                                        <ul className="text-sm text-text/80 list-disc list-inside space-y-1">
                                            <li><strong className="text-text">{(guests * 0.4).toFixed(1)}kg</strong> de Carne</li>
                                            <li><strong className="text-text">{(guests * 0.8).toFixed(1)}L</strong> de Bebida</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-text mb-2 pl-2">Mensagem (Opcional)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={3}
                                        className="w-full bg-background border-2 border-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-text placeholder-text/40 transition-colors"
                                        placeholder="Deixe um recadinho para a Olívia..."
                                    />
                                </div>

                                <button
                                    disabled={formState === 'submitting'}
                                    type="submit"
                                    className="w-full bg-primary hover:bg-[#ffdf33] text-text font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formState === 'submitting' ? 'Enviando...' : (
                                        <>
                                            Confirmar Presença <Send size={18} />
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-center text-text/40 mt-4">
                                    Ao confirmar, enviaremos uma cópia para seu email.
                                </p>
                            </form>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
