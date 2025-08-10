import { motion } from "framer-motion";

const labels = [
    { text: "Stress", x: -220, y: -160, delay: 0 },
    { text: "Anxiety", x: 180, y: -180, delay: 0.1 },
    { text: "Focus", x: -180, y: 140, delay: 0.2 },
    { text: "Mindfulness", x: 200, y: 150, delay: 0.3 },
    { text: "Sleep", x: -150, y: -230, delay: 0.4 },
    { text: "Motivation", x: 230, y: 100, delay: 0.5 },
    { text: "Burnout", x: -250, y: 60, delay: 0.6 },
    { text: "Emotions", x: 200, y: -100, delay: 0.7 },
];

export default function AnimatedBrainImage() {
    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover="hover"
            variants={{ initial: {}, hover: {} }}
            className="relative w-full max-w-xl mx-auto mb-10 group"
        >
            <motion.img
                src="./hero.png"
                alt="Brain illustration"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-xl transition-all duration-300"
                variants={{
                    initial: { scale: 0.95, rotate: 0 },
                    hover: { scale: 1.05, rotate: 2 },
                }}
                transition={{ type: "tween", duration: -0.3 }}
            />


            {labels.map((item, idx) => (
                <motion.div
                    key={idx}
                    variants={{
                        initial: { opacity: 0, x: 0, y: 0, scale: 0.5 },
                        hover: {
                            opacity: 1,
                            x: item.x,
                            y: item.y,
                            scale: 1,
                            transition: {
                                duration: 0.8,
                                type: "spring",
                                delay: item.delay,
                            },
                        },
                    }}
                    className="absolute left-1/2 top-1/2"
                >
                    <div className="px-5 py-3 text-base font-semibold text-white bg-[#111827] border border-white/10 rounded-xl shadow-md backdrop-blur-sm transition duration-300 hover:shadow-xl hover:ring-1 hover:ring-white/20">
                        {item.text}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
