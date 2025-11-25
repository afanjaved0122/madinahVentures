import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight * 0.3);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="relative">
            {/* Fixed Progress Bar at the very top */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 origin-[0%] z-[100]"
                style={{ scaleX }}
            />

            <Navigation />

            <main>
                <Hero />
                <About />
                <Services />
                <Stats />
                <Expertise />
                <Projects />
                <Testimonials />
                <Contact />
            </main>

            <Footer />

            {/* Modern Scroll to Top Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: isScrolled ? 1 : 0,
                    scale: isScrolled ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-4 right-20 z-40"
            >
                <Button
                    onClick={scrollToTop}
                    size="icon"
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-2xl hover:shadow-3xl transition-all duration-300 border-0"
                >
                    <ArrowUp className="h-5 w-5 text-white" />
                </Button>
            </motion.div>
        </div>
    );
};

export default Index;