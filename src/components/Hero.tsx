import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-4 pt-20">
            <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8 relative"
            >
                {/* Circular Photo Holder Placeholder */}
                <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center relative">
                    <img src="/daisy.png" alt="Margarida" className="w-full h-full object-contain opacity-90 mix-blend-multiply" />
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-heading font-bold text-text mb-2 tracking-tight"
            >
                Olívia
            </motion.h1>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl md:text-5xl font-heading text-text/60 font-medium mb-6"
            >
                1 Aninho
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg md:text-xl font-body text-text/80 max-w-md mb-10 leading-relaxed"
            >
                Você é nosso convidado especial para celebrar o primeiro aninho da nossa pequena flor!
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex gap-4"
            >
                <button onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary hover:bg-[#ffdf33] text-text font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 text-lg font-heading">
                    Confirmar Presença
                </button>
            </motion.div>

            <motion.div
                className="absolute bottom-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            >
                <ChevronDown className="text-text/50 w-8 h-8" />
            </motion.div>
        </section>
    );
}
