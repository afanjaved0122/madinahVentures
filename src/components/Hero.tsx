import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import aiimage1 from "../assets/images/aiimage.jpg";
import aiimage2 from "../assets/images/aiimage.jpg";
import aiimage3 from "../assets/images/aiimage.jpg";
import aiimage4 from "../assets/images/aiimage.jpg";
import aiimage5 from "../assets/images/aiimage.jpg";

const rightImages = [aiimage1, aiimage2, aiimage3];
// const bottomSliderImages = [aiimage3, aiimage4, aiimage5];

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<any> = [];
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      particles.push({
        x, y,
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

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    resizeCanvas();

    let animationId: number;
    function animate() {
      resizeCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.angle += p.speed;
        p.baseX += Math.sin(p.angle) * 0.5;
        p.baseY += Math.cos(p.angle) * 0.3;
        p.x += p.dx * 0.3;
        p.y += p.dy * 0.3;

        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance && mousePosition.x > 0 && mousePosition.y > 0) {
          const force = (maxDistance - distance) / maxDistance;
          const smoothForce = Math.pow(force, 2) * 0.1;
          p.x += dx * p.magnetism * smoothForce;
          p.y += dy * p.magnetism * smoothForce;
        } else {
          const returnForce = 0.002;
          p.x += (p.baseX - p.x) * returnForce;
          p.y += (p.baseY - p.y) * returnForce;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(249, 115, 22, ${p.opacity})`);
        gradient.addColorStop(0.4, `rgba(234, 88, 12, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(194, 65, 12, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    }
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mousePosition]);

  // Right-side carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rightImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Bottom slider auto
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % bottomSliderImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
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

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16 min-h-screen flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          {/* Left Text */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="text-white">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Building the{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 bg-clip-text text-transparent">Next Generation </span>
              of Digital Experiences.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-2xl">
              We craft powerful, scalable, and modern digital solutions designed to help businesses grow.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white text-lg px-8 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Start Your Journey</Button>
              <Button size="lg" variant="outline" className="border-2 border-white/60 text-white bg-white/5 hover:bg-white hover:text-gray-900 text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300 transform hover:scale-105" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>View Our Services</Button>
            </motion.div>
          </motion.div>

          {/* Right-side carousel */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative flex justify-center items-center py-6 sm:py-8 rounded-2xl sm:rounded-3xl p-3 sm:p-4">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={rightImages[currentIndex]}
                  alt="Carousel"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Slider with Dots */}
        <div className="mt-16 w-full flex flex-col items-center">
          <motion.div className="w-full overflow-x-hidden flex gap-6 py-4 px-2 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
            <AnimatePresence mode="wait">
              {/* <motion.div
                key={activeSlide}
                className="flex-shrink-0 w-48 sm:w-60 md:w-72 h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden border border-white/20 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
              >
                <img src={bottomSliderImages[activeSlide]} alt={`slider-${activeSlide}`} className="w-full h-full object-cover" />
              </motion.div> */}
            </AnimatePresence>
          </motion.div>

          {/* Dots */}
          {/* <div className="flex gap-2 mt-4">
            {rightImages.map((_, idx) => (
              <div key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeSlide ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div> */}
        </div>

        {/* Bottom Explore Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <button onClick={scrollToAbout} className="flex flex-col items-center text-white/70 hover:text-white transition-colors group">
            <span className="text-sm mb-2 group-hover:text-cyan-400 transition-colors">Explore More</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="p-2 rounded-full border border-white/30 group-hover:border-cyan-400 transition-colors">
              <ArrowDown size={20} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
