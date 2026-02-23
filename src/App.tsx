import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Docs from "./pages/Docs";
import Projects from "./pages/Projects";
import Community from "./pages/Community";
import NeuralNetworkProject from "./pages/projects/NeuralNetworkProject";
import ModelDeployment from "./pages/docs/ModelDeployment";
import LinearRegressionModule from "./pages/machinelearning/linearregression";
import BatchDeploymentAWS from "./pages/docs/BatchDeploymentAWS";
import BatchDeploymentGCP from "./pages/docs/BatchDeploymentGCP";
import OnlineDeploymentAWS from "./pages/docs/OnlineDeploymentAWS";
import OnlineDeploymentGCP from "./pages/docs/OnlineDeploymentGCP";
import BasicChatbot from "./pages/docs/BasicChatbot";
import BasicRAG from "./pages/docs/BasicRAG";
import Assignments from "./pages/Assignments";
import BasicRAGAssignment from "./pages/assignments/BasicRAGAssignment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/community" element={<Community />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/assignments/basic-rag" element={<BasicRAGAssignment />} />
            <Route path="/projects/neural-network" element={<NeuralNetworkProject />} />
            <Route path="/docs/model-deployment" element={<ModelDeployment />} />
            <Route path="/docs/linear-regression" element={<LinearRegressionModule />} />
            <Route path="/docs/batchdeployment/aws" element={<BatchDeploymentAWS />} />
            <Route path="/docs/batchdeployment/gcp" element={<BatchDeploymentGCP />} />
            <Route path="/docs/onlinedeployment/aws" element={<OnlineDeploymentAWS />} />
            <Route path="/docs/onlinedeployment/gcp" element={<OnlineDeploymentGCP />} />
            <Route path="/docs/basic-chatbot" element={<BasicChatbot />} />
            <Route path="/docs/basic-rag" element={<BasicRAG />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
