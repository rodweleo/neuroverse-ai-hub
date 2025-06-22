
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
import MainChatPage from "./pages/Chat/Index";
import ChatPage from "./pages/Chat/c/[chatId]/page";

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
          <Route path="/chat" element={<MainChatPage />}>
            <Route path="c/:chatId" element={<ChatPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Providers>
);

export default App;
