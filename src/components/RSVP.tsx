import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function RSVP() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [guests, setGuests] = useState(1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
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
                    "Total de Pessoas": `${guests}`,
                    "Acompanhantes": companionsString,
                    "Mensagem": message || "Sem mensagem",
                    _subject: `Nova Presença: ${name} + ${companions.length}`,
                    "🍖 Carne (kg)": `${(guests * 0.4).toFixed(1)}kg`,
                    "🥤 Bebida (L)": `${(guests * 0.8).toFixed(1)}L`,
                    _template: "table",
                    _captcha: "false"
                })
            });
            setFormState('success');
        } catch (error) {
            console.error("Erro ao enviar:", error);
            alert("Ops! Houve um erro ao enviar. Por favor, tente novamente.");
            setFormState('idle');
        }
    };

    return (
        <section id="rsvp" className="relative z-10 py-24 px-4 bg-white/40 backdrop-blur-sm">
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border-4 border-primary/20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-heading text-center mb-2 text-text">Presença</h2>
                    <p className="text-center text-text/60 mb-8">Por favor, confirme até 05/02/2026</p>

                    {formState === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-10"
                        >
                            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-heading text-text text-center">Confirmado!</h3>
                            <p className="text-text/70 text-center">Mal podemos esperar para te ver!</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                Ao confirmar, você está deixando o dia da Olívia mais feliz!
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
