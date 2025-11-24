import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from '../assets/images/madinah.png';
import logoWhite from '../assets/images/logo-white.png'
const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h3 className="text-3xl font-bold mb-4">
                            <img src={logoWhite} alt="Madinah Ventures Logo" style={{ width: '180px' }} />
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            We craft modern digital solutions that empower businesses to grow, innovate, and thrive online.
                        </p>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-cyan-500" />
                                <span className="text-gray-300">madinahventures@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-cyan-500" />
                                <span className="text-gray-300">+92 300 4948089</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-cyan-500" />
                                <span className="text-gray-300">Lahore, Pakistan</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="border-t border-gray-800 mt-8 pt-6 text-center"
                >
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Madinah Ventures. Crafted with passion for digital innovation. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
