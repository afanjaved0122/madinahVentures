import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project
{
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    liveDemo?: string;
    github?: string;
}

interface ProjectsState
{
    projects: Project[];
}

const initialState: ProjectsState = {
    projects: [
        {
            id: '1',
            title: "SPM - Indigenous Project Management Platform",
            description: "A comprehensive project management solution with customized business processes for flex signage industry.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
            technologies: ["React", "Flask", "PostgreSQL"],
            category: "SaaS (Software as a Service)",
        },
        {
            id: '2',
            title: "Chatiniti - A real-time responsive chat application",
            description: "A real-time chat application with responsive design and user authentication.",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600",
            technologies: ["Flask", "Python", "PostgreSQL"],
            category: "Communication",
        },
        {
            id: '3',
            title: "Crappo - A Modern Crypto Trading Platform",
            description: "A modern crypto trading platform with real-time data and advanced trading features.",
            image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=600",
            technologies: ["Next.Js", "NextAuth", "MongoDB"],
            category: "Cryptocurrency",
        }
    ],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) =>
        {
            state.projects.push(action.payload);
        },
        updateProject: (state, action: PayloadAction<Project>) =>
        {
            const index = state.projects.findIndex(p => p.id === action.payload.id);
            if (index !== -1)
            {
                state.projects[index] = action.payload;
            }
        },
        deleteProject: (state, action: PayloadAction<string>) =>
        {
            state.projects = state.projects.filter(p => p.id !== action.payload);
        },
    },
});

export const { addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;