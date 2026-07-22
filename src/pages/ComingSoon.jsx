import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiTruck, FiAward, FiLock, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Comingsoon.css';

// Countdown Hook
const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};

const groceryItems = [
    '🍅', '🥕', '🥦', '🥬', '🍃', '🫑', '🥒', '🍆', '🧅', '🧄',
    '🍄', '🌽', '🥔', '🥑', '🍎', '🍊', '🍋', '🍓', '🍌', '🌿'
];

const GroceryParticles = () => {
    const [particles, setParticles] = useState([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Generate random particles positioned primarily at the edges
        const generated = Array.from({ length: 40 }).map((_, i) => {
            const isLeft = Math.random() > 0.5;
            // Left area: -5% to 25%, Right area: 75% to 105%
            const leftPos = isLeft ? Math.random() * 30 - 5 : Math.random() * 30 + 75;

            return {
                id: i,
                icon: groceryItems[Math.floor(Math.random() * groceryItems.length)],
                size: Math.floor(Math.random() * 64) + 16, // 16px to 80px
                left: `${leftPos}%`,
                durationY: Math.random() * 25 + 20, // 20s to 45s upward drift
                durationX: Math.random() * 10 + 15, // 15s to 25s swaying
                delay: Math.random() * -40, // Negative delay to pre-populate the screen
                rotateTo: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 360 + 180),
                driftX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 120 + 40),
                blur: Math.random() > 0.7 ? Math.random() * 3 + 1 : 0, // Some blurred for depth
                parallaxFactor: Math.random() * 0.5 + 0.1,
            };
        });
        setParticles(generated);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: '110vh', x: 0, opacity: 0, rotate: 0, scale: 0.8 }}
                    animate={{
                        y: ['120vh', '-20vh'], // Move bottom to top
                        x: [0, p.driftX, -p.driftX / 2, 0], // Organic wind-like swaying
                        opacity: [0, 0.85, 1, 0.85, 0], // Fade in and out smoothly
                        rotate: p.rotateTo,
                        scale: [0.8, 1.15, 0.9, 1]
                    }}
                    transition={{
                        y: { duration: p.durationY, repeat: Infinity, ease: "linear", delay: p.delay },
                        x: { duration: p.durationX, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: p.delay },
                        opacity: { duration: p.durationY, repeat: Infinity, ease: "linear", delay: p.delay },
                        rotate: { duration: p.durationY, repeat: Infinity, ease: "linear", delay: p.delay },
                        scale: { duration: p.durationX, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: p.delay }
                    }}
                    className="absolute will-change-transform flex items-center justify-center"
                    style={{
                        left: p.left,
                        fontSize: `${p.size}px`,
                        filter: `drop-shadow(0 10px 15px rgba(0,0,0,0.1)) blur(${p.blur}px)`,
                        transform: `translateY(${scrollY * p.parallaxFactor}px)`, // Parallax effect
                    }}
                >
                    <motion.div
                        className="pointer-events-auto cursor-default"
                        whileHover={{ scale: 1.3, rotate: 15, transition: { duration: 0.3 } }}
                    >
                        {p.icon}
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all duration-300"
    >
        <div className="w-14 h-14 rounded-full bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] mb-4">
            <Icon className="text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </motion.div>
);

export default function ComingSoon() {
    // Target date: 30 days from now
    const [targetDate] = useState(new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString());
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000);
            setEmail('');
        }
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#fafcfb] text-slate-800 font-sans overflow-hidden selection:bg-[#2E7D32]/20 selection:text-[#2E7D32]">

            {/* Dynamic Premium Grocery Particles Background */}
            <GroceryParticles />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

                {/* Header / Brand */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center justify-center gap-3 mb-6">
                        <FiShoppingBag className="text-4xl text-[#2E7D32]" />
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                            Grandma's Basket
                        </h2>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                        We're Launching <span className="text-[#2E7D32]">Soon!</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-4 leading-relaxed">
                        Grandma's Basket is preparing to bring fresh groceries, household essentials, and everyday products straight to your doorstep across the UK.
                    </p>
                    <p className="max-w-xl mx-auto text-base text-slate-500 mb-10">
                        Our team is putting the finishing touches on your new shopping experience. Stay tuned for the official launch.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}