import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const Stats = () => {
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const stats = [
        { number: 100, label: "Projects Completed", suffix: "+" },
        { number: 5, label: "Years Experience", suffix: "+" },
        { number: 100, label: "Client Satisfaction", suffix: "%" }
    ];

    return (
        // <section id="stats" className="py-20 bg-gradient-to-r from-cyan-400 to-blue-500">
        //     <div className="container mx-auto px-4">
        //         <motion.div
        //             ref={ref}
        //             initial={{ opacity: 0, y: 100 }}
        //             animate={inView ? { opacity: 1, y: 0 } : {}}
        //             transition={{ duration: 0.8 }}
        //             className="grid grid-cols-1 md:grid-cols-3 gap-8"
        //         >
        //             {stats.map((stat, index) => (
        //                 <motion.div
        //                     key={index}
        //                     initial={{ opacity: 0, y: 50, scale: 0.8 }}
        //                     animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        //                     transition={{ duration: 0.8, delay: index * 0.2 }}
        //                     className="text-center text-white"
        //                 >
        //                     <div className="text-6xl md:text-7xl font-bold mb-4">
        //                         <CountUpAnimation
        //                             end={stat.number}
        //                             duration={2000}
        //                             inView={inView}
        //                             suffix={stat.suffix}
        //                         />
        //                     </div>
        //                     <p className="text-xl md:text-2xl text-white/90">{stat.label}</p>
        //                 </motion.div>
        //             ))}
        //         </motion.div>
        //     </div>
        // </section>
        <section id="stats" className="py-12 bg-gradient-to-r from-cyan-400 to-blue-500">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="text-center text-white"
                        >
                            <div className="text-6xl md:text-7xl font-bold mb-4">
                                <CountUpAnimation
                                    end={stat.number}
                                    duration={2000}
                                    inView={inView}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <p className="text-xl md:text-2xl text-white/90">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

    );
};

const CountUpAnimation = ({ end, duration, inView, suffix }: { end: number; duration: number; inView: boolean; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [end, duration, inView]);

    return <span>{count}{suffix}</span>;
};

export default Stats;
