import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Plus, Minus } from 'lucide-react';

export default function RSVP() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [guests, setGuests] = useState(1);
    const [babies, setBabies] = useState(0); // 0-2 anos
    const [children, setChildren] = useState(0); // 3-10 anos
    const [ticketData, setTicketData] = useState<{ name: string, guests: number, babies: number, children: number, companions: string, meat: string, drinks: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;


        // Collect companion names
        const companions: string[] = [];
        for (let i = 0; i < guests - 1; i++) {
            const companionName = formData.get(`guest_${i + 1}`) as string;
            if (companionName) companions.push(companionName);
        }
        const companionsString = companions.length > 0 ? companions.join(', ') : "Nenhum";

        // BBQ Calc: Adults count as 1, Children (3-10) count as 0.5 for meat, Babies 0.
        // Assuming 'guests' includes the main user (adult) + other adults/companions entered in the dropdown?
        // Actually, the previous logic was just `guests * rate`.
        // Now we have `guests` (total people selected in dropdown, implying seats/plate) AND separate `babies`/`children`.
        // Use case assumption: "Total Guests" dropdown usually implies "Adults + Children who need seats".
        // But the user asked for specific counters. I will assume 'guests' from dropdown is the base count (likely adults/teens) and these are ADDITIONS or Breakdown.
        // To be safe and simple: I'll stick to the previous calculation for 'guests' as "Headcount" for now, or refine it.
        // Let's assume the BBQ calc should consider everyone:
        // Meat: Adult (0.4), Child (0.2), Baby (0)
        // Drinks: Adult (0.8), Child (0.4), Baby (0)

        // Wait, if users select "3 guests" in dropdown, and then add "2 children", is the total 5?
        // The dropdown says "Total de Convidados (incluindo você)".
        // If I have 1 child, do I select 2 in dropdown? Or 1 in dropdown + 1 in child counter?
        // The user asked for "Confirmation of presence" with a field for babies/children.
        // Usually these are separate from the main "Adults" count in Brazilian RSVPs.
        // I will treat 'guests' as "Adults/Teens (Standard)" and 'babies'/'children' as extra stats.

        // BBQ Calculation:
        const meatTotal = (guests * 0.4) + (children * 0.2);
        const drinksTotal = (guests * 0.8) + (children * 0.4);

        const meat = `${meatTotal.toFixed(1)}kg`;
        const drinks = `${drinksTotal.toFixed(1)}L`;

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    guests,
                    babies,
                    children,
                    companions: companionsString,
                    meat,
                    drinks
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Erro no servidor');
            }

            setTicketData({ name, guests, babies, children, companions: companionsString, meat, drinks });
            setFormState('success');
        } catch (error) {
            console.error("Erro ao enviar:", error);
            alert(`Ops! Algo deu errado: ${error}`);
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
                                <div className="border-b border-primary/10 pb-3 mb-3">
                                    <p className="text-[10px] text-text/50 uppercase font-bold tracking-wider mb-1">Convidado VIP</p>
                                    <p className="font-heading text-2xl text-text leading-tight">{ticketData.name}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center bg-primary/5 rounded-xl p-3">
                                        <p className="text-[10px] text-text/50 uppercase font-bold">Total</p>
                                        <p className="font-heading text-lg text-text">{ticketData.guests + ticketData.babies + ticketData.children} Pessoas</p>
                                    </div>
                                    <div className="text-center bg-primary/5 rounded-xl p-3">
                                        <p className="text-[10px] text-text/50 uppercase font-bold">Data</p>
                                        <p className="font-heading text-lg text-text">16/02</p>
                                    </div>
                                </div>

                                {(ticketData.babies > 0 || ticketData.children > 0) && (
                                    <div className="flex gap-2 justify-center mt-2">
                                        {ticketData.children > 0 && (
                                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{ticketData.children} Crianças</span>
                                        )}
                                        {ticketData.babies > 0 && (
                                            <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded-full">{ticketData.babies} Bebês</span>
                                        )}
                                    </div>
                                )}

                                {ticketData.companions !== "Nenhum" && (
                                    <div className="mt-4">
                                        <p className="text-[10px] text-text/50 uppercase font-bold tracking-wider mb-1">Acompanhantes</p>
                                        <p className="text-sm text-text leading-snug">{ticketData.companions}</p>
                                    </div>
                                )}

                                <div className="bg-primary/5 p-4 rounded-xl mt-4 border border-primary/10">
                                    <p className="text-[10px] text-text/50 uppercase font-bold tracking-wider mb-2">Sugestão para levar:</p>
                                    <div className="flex gap-4">
                                        <p className="text-sm text-text font-bold">🍖 {ticketData.meat}</p>
                                        <p className="text-sm text-text font-bold">🥤 {ticketData.drinks}</p>
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
                                    <label htmlFor="guests" className="block text-sm font-bold text-text mb-2 pl-2">Adultos (incluindo você)</label>
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

                                    {/* Child Counters */}
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="bg-background border-2 border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
                                            <span className="text-xs font-bold text-text/60 mb-2">Crianças (3-10 anos)</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                                    className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-heading text-xl text-text w-4 text-center">{children}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setChildren(Math.min(10, children + 1))}
                                                    className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-background border-2 border-primary/20 rounded-xl p-3 flex flex-col items-center justify-center">
                                            <span className="text-xs font-bold text-text/60 mb-2">Bebês (0-2 anos)</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setBabies(Math.max(0, babies - 1))}
                                                    className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-heading text-xl text-text w-4 text-center">{babies}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setBabies(Math.min(10, babies + 1))}
                                                    className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {guests > 1 && (
                                        <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="block text-sm font-bold text-text pl-1">Nome dos Acompanhantes (Adultos):</label>
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
                                            <li><strong className="text-text">{((guests * 0.4) + (children * 0.2)).toFixed(1)}kg</strong> de Carne</li>
                                            <li><strong className="text-text">{((guests * 0.8) + (children * 0.4)).toFixed(1)}L</strong> de Bebida</li>
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
