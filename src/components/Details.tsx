import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, UtensilsCrossed, Waves, Gamepad2, Music } from 'lucide-react';

const DetailCard = ({ icon: Icon, title, text, subtext, delay }: { icon: any, title: string, text: React.ReactNode, subtext?: React.ReactNode, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-2 border-primary/10 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
    >
        <div className="bg-primary/20 p-4 rounded-full mb-4 text-text">
            <Icon size={28} />
        </div>
        <h3 className="font-heading text-2xl font-bold mb-2 text-text">{title}</h3>
        <p className="font-body text-lg text-text/90 font-medium">{text}</p>
        {subtext && <div className="font-body text-sm text-text/60 mt-1">{subtext}</div>}
    </motion.div>
);

const AttractionItem = ({ icon: Icon, text, delay }: { icon: any, text: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center justify-center p-4 bg-white/60 rounded-2xl border border-primary/10 shadow-sm"
    >
        <Icon className="text-primary mb-2" size={24} />
        <span className="font-heading text-text text-sm md:text-base text-center">{text}</span>
    </motion.div>
);

export default function Details() {
    return (
        <section className="relative z-10 py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-heading text-center mb-16 text-text"
                >
                    Detalhes da Festa
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <DetailCard
                        icon={Calendar}
                        title="Data"
                        text="16 de Fevereiro de 2026"
                        subtext="Segunda-feira"
                        delay={0.2}
                    />
                    <DetailCard
                        icon={Clock}
                        title="Horário"
                        text="Às 16:30 horas"
                        subtext="Até as 22:30"
                        delay={0.4}
                    />
                    <DetailCard
                        icon={MapPin}
                        title="Local"
                        text="Macaé"
                        subtext={
                            <a
                                href="https://www.google.com/maps/place/Espa%C3%A7o+Atl%C3%A2ntico/@-22.3253871,-41.752044,13z/data=!4m6!3m5!1s0x962518167506e9:0x623b85c123bb0c80!8m2!3d-22.3111359!4d-41.750024!16s%2Fg%2F11sqcsm3md?entry=ttu&g_ep=EgoyMDI2MDEyNS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
                            >
                                Rua Zelina Vasconcelos Medeiros S/N QD:32, LT:51 - CEP 27971-221
                            </a>
                        }
                        delay={0.6}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h3 className="text-2xl font-heading text-text mb-6">Diversão Garantida!</h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <AttractionItem icon={UtensilsCrossed} text="Churrasco Americano" delay={0.1} />
                    <AttractionItem icon={Waves} text="Piscina" delay={0.2} />
                    <AttractionItem icon={Gamepad2} text="Pula Pula & Totó" delay={0.3} />
                    <AttractionItem icon={Music} text="Muita Música" delay={0.4} />
                </div>
            </div>
        </section>
    );
}
