import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true); // start "sending..."

        // Simulate sending delay (1.5 seconds)
        setTimeout(() => {
            setIsSubmitting(false); // stop "sending..."
            toast({
                title: "Message sent!",
                description: "Thank you for reaching out. We'll contact you soon.",
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };


    const contactInfo = [
        { icon: <Mail className="w-6 h-6" />, title: "Email", value: "madinahventures@gmail.com", href: "mailto:madinahventures@gmail.com" },
        { icon: <Phone className="w-6 h-6" />, title: "Phone", value: "+92 300 4948089", href: "tel:+923004948089" },
        { icon: <MapPin className="w-6 h-6" />, title: "Location", value: "Lahore, Pakistan", href: "#" }
    ];

    return (
        <section id="contact" className="py-16 md:py-12 bg-blue-50 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        Get in Touch & Build Something{" "}
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                            Incredible
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                        Have a project idea or a challenge to solve? Share your vision with us, and let’s create amazing digital solutions together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Send a Message</h3>
                        <form onSubmit={handleSubmit} ref={form}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required className="h-10 md:h-12" />
                                <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="h-10 md:h-12" />
                            </div>
                            <div className="mb-3">
                                <Input name="subject" placeholder="Project Subject" value={formData.subject} onChange={handleInputChange} required className="h-10 md:h-12" />
                            </div>
                            <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required rows={4} className="resize-none" />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                            >
                                {isSubmitting ? "Sending..." : <><Send className="w-5 h-5 mr-2" />Send Message</>}
                            </Button>
                        </form>
                    </motion.div>


                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Reach Out</h3>
                            <p className="text-gray-700 mb-4">
                                Whether you have a clear project plan or just an idea, we are excited to collaborate and bring your vision to life. Let’s make it happen!
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={index}
                                    href={info.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                                    className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{info.title}</h4>
                                        <p className="text-gray-700 text-sm">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white"
                        >
                            <h4 className="text-xl font-bold mb-2">Want to Collaborate?</h4>
                            <p className="mb-4 text-sm md:text-base">
                                Schedule a free consultation with our team to discuss your project goals and explore how we can help bring your ideas to life.
                            </p>
                            <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 text-sm md:text-base">
                                Book a Consultation
                            </Button>
                        </motion.div> */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
