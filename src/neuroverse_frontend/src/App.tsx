import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DeployAgentPage from "./pages/DeployAgentPage";
import AgentManagementPage from "./pages/AgentManagementPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AgentMarketplace from "./pages/AgentMarketplace";
import ToolMarketplace from "./pages/ToolMarketplace";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Providers from "./components/providers";
import MainChatPage from "./pages/Chat/Index";
import ChatPage from "./pages/Chat/c/[chatId]/page";
import AccountModal from "./components/account/account-modal";
import AuthModal from "./components/auth/auth-modal";
import { AuthProvider } from "@/contexts/use-auth-client";

const App = () => (
  <Providers>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agent-marketplace" element={<AgentMarketplace />} />
            <Route path="/tools-marketplace" element={<ToolMarketplace />} />
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
          <AuthModal />
          <AccountModal />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  </Providers>
);

export default App;
