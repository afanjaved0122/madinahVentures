import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import code from '../assets/images/code.jpg'

const Expertise = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    const technologies = [
        "React", "Node.js", "Python", "TypeScript", "AWS", "Docker",
        "MongoDB","Next.js"
    ];

    const expertiseAreas = [
        {
            title: "Artificial Intelligence",
            description: "Creating smart systems that simplify workflows and deliver actionable insights.",
        },
        {
            title: "Cloud & DevOps",
            description: "Designing scalable infrastructure and automating deployments seamlessly.",
        },
        {
            title: "Cybersecurity",
            description: "Implementing robust security measures to protect applications and data.",
        },
        {
            title: "Performance Optimization",
            description: "Enhancing speed, reliability, and scalability of applications for better user experience.",
        }
    ];

    return (
        <section id="expertise" className="min-h-screen py-12 bg-white">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        Our Core Expertise
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        We combine technical mastery and innovative thinking to deliver high-quality solutions for complex challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img
                            src={code}
                            alt="Programming and development"
                            className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-2xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-4"
                    >
                        {expertiseAreas.map((area, index) => (
                            <div key={index} className="p-4 md:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{area.title}</h3>
                                <p className="text-gray-600 text-sm md:text-base">{area.description}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Technologies */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Technologies We Master</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {technologies.map((tech, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-medium hover:shadow-md transition-all duration-300"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Expertise;
