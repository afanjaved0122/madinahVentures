import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const form = useRef();
    const { toast } = useToast();
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation errors
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [messageError, setMessageError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous errors
        setNameError("");
        setEmailError("");
        setMessageError("");

        const formData = new FormData(form.current);

        if (!formData.get("name")) {
            setNameError("Please enter your full name.");
            return;
        }
        if (!formData.get("email")) {
            setEmailError("Please enter your email.");
            return;
        }
        if (!formData.get("message")) {
            setMessageError("Please enter your message.");
            return;
        }

        setIsSubmitting(true);

        emailjs
            .sendForm(
                "service_u309dn8",
                "template_o6gqmeg",
                form.current,
                "ouIcwXCfHjWg8RnMM"
            )
            .then(
                () => {
                    toast({
                        title: "Message Sent!",
                        description: "Thank you for contacting us. We'll get back soon.",
                    });

                    form.current.reset();
                    setIsSubmitting(false);
                },
                () => {
                    toast({
                        title: "Failed to send",
                        description: "Something went wrong. Try again.",
                        variant: "destructive",
                    });
                    setIsSubmitting(false);
                }
            );
    };

    const contactInfo = [
        { icon: <Mail className="w-6 h-6" />, title: "Email", value: "madinahventures@gmail.com", href: "mailto:madinahventures@gmail.com" },
        { icon: <Phone className="w-6 h-6" />, title: "Phone", value: "+92 300 4948089", href: "tel:+923004948089" },
        { icon: <MapPin className="w-6 h-6" />, title: "Location", value: "Lahore, Pakistan", href: "#" },
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
                        Have a project idea or a challenge to solve? Share your vision with us and let’s create something amazing together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Send a Message</h3>

                        <form ref={form} onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <Input name="name" placeholder="Full Name" className="h-12" />
                                    {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                                </div>

                                <div>
                                    <Input name="email" type="email" placeholder="Email Address" className="h-12" />
                                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <Input name="subject" placeholder="Project Subject" className="h-12" />
                            </div>

                            <div>
                                <Textarea name="message" placeholder="Your Message" rows={4} className="resize-none" />
                                {messageError && <p className="text-red-500 text-sm mt-1">{messageError}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                            >
                                {isSubmitting ? "Sending..." : (<><Send className="w-5 h-5 mr-2" /> Send Message</>)}
                            </Button>
                        </form>
                    </motion.div>

                    {/* CONTACT INFO */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Reach Out</h3>

                        <p className="text-gray-700 mb-4">
                            Whether it's a full project or just brainstorming an idea—let's collaborate and build something great!
                        </p>

                        <div className="space-y-4">
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={i}
                                    href={info.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                                    className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{info.title}</h4>
                                        <p className="text-gray-700 text-sm">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
