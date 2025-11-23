import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";

const AllProjects = () =>
{
    const projects = useSelector((state: RootState) => state.projects.projects);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm" asChild>
                                <Link to="/">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold text-gray-900">All Projects</h1>
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Codiniti
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {project.liveDemo && (
                                        <Button size="sm" variant="outline" className="flex-1" asChild>
                                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                    {project.github && (
                                        <Button size="sm" variant="outline" className="flex-1" asChild>
                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="w-4 h-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No projects found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProjects;