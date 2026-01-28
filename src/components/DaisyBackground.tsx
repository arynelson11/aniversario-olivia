import { motion } from 'framer-motion';

const Daisy = ({ size, delay, x, y }: { size: number, delay: number, x: string, y: string }) => (
    <motion.div
        className="absolute opacity-30 pointer-events-none"
        style={{ width: size, height: size, left: x, top: y }}
        animate={{
            rotate: 360,
            y: [0, -20, 0],
        }}
        transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay }
        }}
    >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Petals */}
            <path d="M50 25C50 11.1929 61.1929 0 75 0C88.8071 0 100 11.1929 100 25C100 38.8071 88.8071 50 75 50C61.1929 50 50 38.8071 50 25Z" fill="#FFFFFF" />
            <path d="M50 75C50 61.1929 38.8071 50 25 50C11.1929 50 0 61.1929 0 75C0 88.8071 11.1929 100 25 100C38.8071 100 50 88.8071 50 75Z" fill="#FFFFFF" />
            <path d="M75 50C88.8071 50 100 61.1929 100 75C100 88.8071 88.8071 100 75 100C61.1929 100 50 88.8071 50 75C50 61.1929 61.1929 50 75 50Z" fill="#FFFFFF" />
            <path d="M25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50Z" fill="#FFFFFF" />
            {/* Center */}
            <circle cx="50" cy="50" r="15" fill="#FFD700" />
        </svg>
    </motion.div>
);

export default function DaisyBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <Daisy size={100} delay={0} x="10%" y="10%" />
            <Daisy size={150} delay={2} x="80%" y="20%" />
            <Daisy size={80} delay={1} x="20%" y="80%" />
            <Daisy size={120} delay={3} x="70%" y="70%" />
            <Daisy size={60} delay={4} x="50%" y="50%" />
            <Daisy size={90} delay={1.5} x="-5%" y="40%" />
            <Daisy size={110} delay={2.5} x="90%" y="60%" />
        </div>
    );
}
