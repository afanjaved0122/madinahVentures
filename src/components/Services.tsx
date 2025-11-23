import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Smartphone, Cloud, Gamepad } from "lucide-react";

const Services = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const services = [
        {
            icon: <Code className="w-12 h-12" />,
            title: "Modern Web Solutions",
            description: "We build fast, responsive, and visually appealing websites and web applications that help businesses grow online.",
            gradient: "from-blue-400 via-indigo-500 to-purple-500"
        },
        {
            icon: <Smartphone className="w-12 h-12" />,
            title: "Advanced Mobile Apps",
            description: "Designing intuitive and high-performance mobile apps for iOS and Android that deliver seamless user experiences.",
            gradient: "from-cyan-400 via-teal-500 to-green-500"
        },
        {
            icon: <Gamepad className="w-12 h-12" />,
            title: "Game Development",
            description: "Creating immersive and interactive games for web, mobile, and desktop platforms with stunning graphics and gameplay.",
            gradient: "from-cyan-400 via-blue-500 to-indigo-500"
        },
        {
            icon: <Cloud className="w-12 h-12" />,
            title: "Cloud & DevOps",
            description: "Implementing scalable cloud infrastructure and automated pipelines to increase performance, security, and reliability.",
            gradient: "from-orange-400 via-red-500 to-pink-500"
        }
    ];

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Our Expertise
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We deliver innovative software solutions and digital experiences to help businesses succeed in a rapidly evolving world.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
