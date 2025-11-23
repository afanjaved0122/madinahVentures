import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import teamWork from '../assets/images/teamWork.jpg'
const About = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Building the Future from{" "}
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            Our Roots
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        We started with a passion for innovation and a vision to revolutionize the digital world. Our team
                        thrives on creating software solutions that simplify lives, empower businesses, and inspire growth
                        globally.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img
                            src={teamWork}

                            alt="Team working"
                            className="w-full h-96 object-cover rounded-2xl shadow-xl"
                        />
                    </motion.div>

                    {/* Mission & Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">
                            Our Mission & Vision
                        </h3>
                        <div className="space-y-4">
                            <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border-l-4 border-blue-500">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Mission</h4>
                                <p className="text-gray-700">
                                    To craft cutting-edge digital solutions that empower organizations to achieve more, faster and smarter.
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-l-4 border-purple-500">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Vision</h4>
                                <p className="text-gray-700">
                                    To be the global leader in software innovation, transforming ideas into impactful realities.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
