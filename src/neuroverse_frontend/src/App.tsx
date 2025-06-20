
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DeployAgentPage from "./pages/DeployAgentPage";
import AgentManagementPage from "./pages/AgentManagementPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Providers from "./components/providers";


const App = () => (
  <Providers>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/deploy" element={<DeployAgentPage />} />
          <Route path="/agents" element={<AgentManagementPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Providers>
);

export default App;
