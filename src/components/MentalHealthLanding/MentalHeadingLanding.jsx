import { Brain, Phone, Heart, Users, Clock, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Stars from '../Stars/Stars'
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { useEffect } from "react";
import { Sparkles, Star } from "lucide-react";
import AnimatedBrainImage from "../AnimatedBrainImage/AnimatedBrainImage";
import QuoteSection from "../QuoteSection/QuoteSection";
import Earth from '../Earth/index'
import WaveyFooter from "../WavyFooter/WaveyFooter";

export default function MentalHealthLanding({ setCurrentState }) {

    const [dpr, setDpr] = useState(window.devicePixelRatio);

    useEffect(() => {
        const handleResize = () => {
            setDpr(window.devicePixelRatio);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#121212] text-white fade-in">
            <header className="bg-[#1c1c1e]/30 backdrop-blur-[10px] shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-2xl bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] shadow-md hover:shadow-indigo-500/50 hover:scale-110 hover:rotate-1 transform transition-all duration-500 ease-out">
                                <Brain className="h-7 w-7 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out" />
                            </div>


                            <div>
                                <h1 className="text-xl font-bold text-white">Cosmind</h1>
                                <p className="text-sm text-gray-400">Mental Wellness Hub</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-300">
                            <Phone className="h-4 w-4" />
                            <span>24/7 Support: +91-800-COSMIND</span>
                        </div>
                    </div>
                </div>
            </header>

            <div style={{ position: 'fixed', width: "100vw", height: "100vh" }}>
                <Canvas
                    camera={{
                        fov: 120,
                        aspect: window.innerWidth / window.innerHeight,
                        near: 1,
                        far: 1000,
                        position: [0, 0, 1],
                        rotation: [Math.PI / 2, 0, 0],
                    }}
                    dpr={dpr}
                >
                    <Stars />
                </Canvas>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{
                            scale: 1.05,
                            rotate: 2,
                            transition: { type: "spring", stiffness: 200, damping: 10 }
                        }}
                        transition={{ duration: 1 }}
                        className="w-full max-w-xl mx-auto mb-10"
                    >
                        <img
                            src="https://www.saishuu.ai/images/hero.png"
                            alt="Brain illustration"
                            className="w-full h-auto object-contain drop-shadow-2xl rounded-xl transition-all duration-500"
                        />
                    </motion.div>

                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Complete our comprehensive mental health assessment to get personalized
                        recommendations and connect with qualified healthcare professionals.
                    </p>
                    <motion.button
                        onClick={() => setCurrentState("quiz")}
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}

                    >
                        Start Assessment
                    </motion.button>
                </motion.div> */}

                <AnimatedBrainImage />


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[{
                        icon: <Heart className="h-8 w-8 text-teal-400" />,
                        title: "Professional Assessment",
                        desc: "Evidence-based screening tools designed by licensed professionals to assess your well-being."
                    }, {
                        icon: <Users className="h-8 w-8 text-cyan-400" />,
                        title: "Expert Matching",
                        desc: "Get matched with professionals based on your needs and preferences."
                    }, {
                        icon: <Clock className="h-8 w-8 text-indigo-400" />,
                        title: "Quick Booking",
                        desc: "Schedule appointments easily with digital appointment slips."
                    }].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white/1 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            whileHover={{ y: -5 }}
                        >
                            <div className="p-4 rounded-xl w-fit mx-auto mb-6 bg-white/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-center leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <QuoteSection setCurrentState={setCurrentState} />

                <motion.div
                    className="bg-white/1 backdrop-blur-md rounded-2xl p-8 shadow-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Your Mental Health Matters
                        </h3>
                        <p className="text-gray-400 leading-relaxed max-w-4xl mx-auto">
                            Mental health is just as important as physical health. This assessment covers
                            areas like mood, anxiety, and stress. All information is confidential and used
                            to provide personalized care recommendations.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            {[
                                { label: "Confidential & Secure", color: "bg-teal-400" },
                                { label: "Professional Network", color: "bg-cyan-400" },
                                { label: "24/7 Support Available", color: "bg-indigo-400" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-2 text-sm text-gray-300">
                                    <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => { setCurrentState('videos') }}
                            className="mt-6 px-6 py-3 rounded-xl 
                 bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] 
                 text-white font-medium shadow-md 
                 hover:shadow-indigo-500/50 hover:scale-105 transform 
                 transition-all duration-500 ease-out flex items-center justify-center space-x-2 w-auto mx-auto"
                        >
                            <span>Get Tips for Mental Health </span>
                            <PlayCircle className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </main>

            {/* <footer className="bg-[#1a1a1a] text-white mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="p-2 rounded-2xl bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] shadow-md hover:shadow-indigo-500/50 hover:scale-110 hover:rotate-1 transform transition-all duration-500 ease-out">
                                    <Brain className="h-7 w-7 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out" />
                                </div>
                                <span className="font-bold text-lg">Cosmind</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Connecting you with mental health professionals for better well-being.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Mental Health Resources</a></li>
                                <li><a href="#" className="hover:text-white">Find a Therapist</a></li>
                                <li><a href="#" className="hover:text-white">Crisis Support</a></li>
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">24/7 Helpline</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Emergency</h4>
                            <div className="text-sm text-gray-400 space-y-2">
                                <p>Crisis Hotline: <br /><span className="text-white font-semibold">988</span></p>
                                <p>Emergency: <br /><span className="text-white font-semibold">911</span></p>
                            </div>
                        </div>
                        <Earth/>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2024 MindCare. All rights reserved. Your mental health is our priority.</p>
                    </div>
                </div>
            </footer> */}

            <footer className="relative bg-gradient-to-t from-black via-black/70 to-transparent text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    {/* Branding + Message */}
                    <div>
                        <div className="flex items-center space-x-4 mb-3">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#3a0ca3] via-[#7209b7] to-[#4361ee] shadow-lg hover:shadow-indigo-500/50 hover:scale-110 transform transition duration-300 ease-out">
                                <Brain className="h-8 w-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                            </div>
                            <span className="text-2xl font-bold tracking-wide">Cosmind</span>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
                            Explore your mental universe with clarity, care, and cosmic support.
                        </p>
                    </div>

                    {/* Earth Canvas */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-[400px] h-[400px]">
                            <Earth />
                        </div>
                    </div>
                </div>

                <div className="h-[15vh]">
                    <WaveyFooter />
                </div>

                {/* Bottom Copyright */}
                <div className="text-center text-xs text-gray-500 pb-6 relative z-10 flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1">
                        Made with <span className="text-red-500"><Heart className="inline h-5 w-5 hover:text-white" /></span> by <span className="font-semibold">Dhanush & Rushikesh</span>
                    </span>
                </div>

            </footer>

        </div>
    );
}
