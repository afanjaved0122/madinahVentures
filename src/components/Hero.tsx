import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import aiimage from "../assets/images/aiimage.jpg";

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<any> = [];

        for (let i = 0; i < 120; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push({
                x,
                y,
                dx: (Math.random() - 0.5) * 0.8,
                dy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                baseX: x,
                baseY: y,
                magnetism: Math.random() * 0.08 + 0.02,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.01 + 0.005,
            });
        }

        let animationId: number;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.angle += particle.speed;
                particle.baseX += Math.sin(particle.angle) * 0.5;
                particle.baseY += Math.cos(particle.angle) * 0.3;

                particle.x += particle.dx * 0.3;
                particle.y += particle.dy * 0.3;

                const dx = mousePosition.x - particle.x;
                const dy = mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance && mousePosition.x > 0 && mousePosition.y > 0) {
                    const force = (maxDistance - distance) / maxDistance;
                    const smoothForce = Math.pow(force, 2) * 0.1;
                    particle.x += dx * particle.magnetism * smoothForce;
                    particle.y += dy * particle.magnetism * smoothForce;
                } else {
                    const returnForce = 0.002;
                    particle.x += (particle.baseX - particle.x) * returnForce;
                    particle.y += (particle.baseY - particle.y) * returnForce;
                }

                const gradient = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.size * 2
                );
                gradient.addColorStop(0, `rgba(249, 115, 22, ${particle.opacity})`);
                gradient.addColorStop(0.4, `rgba(234, 88, 12, ${particle.opacity * 0.6})`);
                gradient.addColorStop(1, `rgba(194, 65, 12, 0)`);

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, [mousePosition]);

    const scrollToAbout = () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="hero" className="min-h-screen relative overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />

            {/* Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 right-10 sm:right-20 text-orange-400/20"
                >
                    <Sparkles size={60} />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 3 }}
                    className="absolute bottom-24 sm:bottom-32 left-10 sm:left-16 text-orange-300/15"
                >
                    <Sparkles size={40} />
                </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16 min-h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

                    {/* Left Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-white"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        >
                            Building the{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 bg-clip-text text-transparent">
                                Next Generation{" "}
                            </span>
                            of Digital Experiences.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-2xl"
                        >
                            We craft powerful, scalable, and modern digital solutions designed to help
                            businesses grow.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white text-lg px-8 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105"
                                onClick={() =>
                                    document.getElementById("contact")?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                            >
                                Start Your Journey
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/60 text-white bg-white/5 hover:bg-white hover:text-gray-900 text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                                onClick={() =>
                                    document.getElementById("services")?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
                            >
                                View Our Services
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex gap-6 sm:gap-8 mt-10 flex-wrap sm:flex-nowrap"
                        >
                            {[
                                { value: "150+", label: "Successful Projects" },
                                { value: "4+", label: "Years of Expertise" },
                                { value: "50+", label: "Satisfied Clients" },
                            ].map((stat) => (
                                <div className="text-center" key={stat.label}>
                                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Side Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative flex justify-center items-center py-6 sm:py-8 border border-white/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4"
                    >
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                            <img
                                src={aiimage}
                                alt="Digital creativity"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute -top-4 -left-4 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-8 -right-8 w-28 sm:w-32 h-28 sm:h-32 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full blur-2xl"></div>
                    </motion.div>
                </div>

                {/* Bottom Explore Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <button
                        onClick={scrollToAbout}
                        className="flex flex-col items-center text-white/70 hover:text-white transition-colors group"
                    >
                        <span className="text-sm mb-2 group-hover:text-cyan-400 transition-colors">
                            Explore More
                        </span>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-2 rounded-full border border-white/30 group-hover:border-cyan-400 transition-colors"
                        >
                            <ArrowDown size={20} />
                        </motion.div>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;