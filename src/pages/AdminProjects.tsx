import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addProject, updateProject, deleteProject, Project } from "@/store/projectsSlice";
import { Link } from "react-router-dom";

const AdminProjects = () =>
{
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.projects.projects);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        category: '',
        liveDemo: '',
        github: ''
    });

    const resetForm = () =>
    {
        setFormData({
            title: '',
            description: '',
            image: '',
            technologies: '',
            category: '',
            liveDemo: '',
            github: ''
        });
        setEditingProject(null);
        setIsFormOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();

        const projectData: Project = {
            id: editingProject?.id || Date.now().toString(),
            title: formData.title,
            description: formData.description,
            image: formData.image,
            technologies: formData.technologies.split(',').map(tech => tech.trim()),
            category: formData.category,
            liveDemo: formData.liveDemo || undefined,
            github: formData.github || undefined
        };

        if (editingProject)
        {
            dispatch(updateProject(projectData));
        } else
        {
            dispatch(addProject(projectData));
        }

        resetForm();
    };

    const handleEdit = (project: Project) =>
    {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies.join(', '),
            category: project.category,
            liveDemo: project.liveDemo || '',
            github: project.github || ''
        });
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) =>
    {
        if (confirm('Are you sure you want to delete this project?'))
        {
            dispatch(deleteProject(id));
        }
    };

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
                            <h1 className="text-3xl font-bold text-gray-900">Admin - Manage Projects</h1>
                        </div>
                        <Button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                        </Button>
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                                    <Input
                                        id="technologies"
                                        value={formData.technologies}
                                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                        placeholder="React, Node.js, MongoDB"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="liveDemo">Live Demo URL (optional)</Label>
                                    <Input
                                        id="liveDemo"
                                        type="url"
                                        value={formData.liveDemo}
                                        onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="github">GitHub URL (optional)</Label>
                                    <Input
                                        id="github"
                                        type="url"
                                        value={formData.github}
                                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="flex-1">
                                        {editingProject ? 'Update Project' : 'Add Project'}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Projects List */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(project)}
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDelete(project.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No projects found. Add your first project!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProjects;
