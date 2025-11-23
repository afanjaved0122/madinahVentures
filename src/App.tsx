import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import AdminProjects from "./pages/AdminProjects";
import NotFound from "./pages/NotFound";
import FloatingWhatsAppButton from "./components/WhatsappChat";

const queryClient = new QueryClient();

const App: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <FloatingWhatsAppButton />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/projects" element={<AllProjects />} />
                            <Route path="/admin/projects" element={<AdminProjects />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);

export default App;