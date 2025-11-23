import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import CodinitiLogo from "@/assets/images/codiniti-logo-transparent.png";
// import CodinitiLogoDark from "@/assets/images/codiniti-logo-transparent-dark.png";


import madinahLogog from '../assets/images/madinah.png'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        console.log("Scrolling to section:", sectionId);
        setIsOpen(false); // Close menu first

        // Small delay to allow menu to close
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const navHeight = 64; // Height of the navigation bar
                const elementPosition = element.offsetTop - navHeight;
                window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                });
            } else {
                console.log("Element not found:", sectionId);
            }
        }, 100);
    };

    const navItems = [
        { label: "Home", id: "hero" },
        { label: "About", id: "about" },
        { label: "Services", id: "services" },
        { label: "Expertise", id: "expertise" },
        { label: "Projects", id: "projects" },
        { label: "Clients", id: "clients" },
        { label: "Contact", id: "contact" }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-transparent"}`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                    >
                        {/* <img src={isScrolled ? CodinitiLogoDark : CodinitiLogo} alt="Logo" className="h-8 w-auto" /> */}
                        <img src={isScrolled ? madinahLogog : madinahLogog} alt="Logo" className="h-8 w-auto" />
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`font-medium transition-colors duration-300 ${isScrolled
                                    ? "text-gray-800 hover:text-cyan-500"
                                    : "text-white hover:text-cyan-400"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <Button
                            onClick={() => scrollToSection("contact")}
                            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 
                   hover:from-blue-600 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg transition-all duration-300"
                        >
                            Get Started
                        </Button>
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 z-50 ${isScrolled ? "text-gray-800" : "text-white"
                            }`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`md:hidden absolute top-16 left-0 right-0 backdrop-blur-md border-b border-gray-100 shadow-lg ${isScrolled ? "bg-white/95" : "bg-transparent"}`}
                    >
                        <div className="py-4 space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`block w-full text-left px-6 py-3  hover:text-orange-600 hover:bg-orange-50 transition-colors duration-300 font-medium ${isScrolled ? "text-gray-800" : "text-white"}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="px-6 pt-2">
                                <Button
                                    onClick={() => scrollToSection("contact")}
                                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navigation;
