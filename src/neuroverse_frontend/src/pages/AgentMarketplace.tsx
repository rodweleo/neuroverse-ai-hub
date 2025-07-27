import AgentDiscovery from "@/components/marketplace/AgentDiscovery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import useAllAgents from "@/hooks/useAllAgents";
import useAllAgentVendors from "@/hooks/useAllAgentVendors";

const AgentMarketplace = () => {
  const { data: agents } = useAllAgents();
  const { data: agentVendors } = useAllAgentVendors();

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <header className="space-y-4 flex flex-wrap items-end justify-between h-60 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 p-6 rounded-lg shadow-lg">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold holographic-text py-2">
            Agent Marketplace
          </h1>
          <p className="text-md sm:text-lg text-muted-foreground">
            Discover, interact with, and deploy AI agents across the NeuroVerse
            ecosystem
          </p>
        </div>
        <Button
          className="bg-neon-purple/80 hover:bg-neon-purple text-white"
          asChild
        >
          <Link to="/deploy">
            <Zap className="h-4 w-4" />
            Deploy Your Agent
          </Link>
        </Button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glassmorphic border-neon-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Store className="h-4 w-4 text-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents ? agents.length : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Active in marketplace
            </p>
          </CardContent>
        </Card>

        <Card className="glassmorphic border-neon-purple/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total AI Agent Vendors
            </CardTitle>
            <Users className="h-4 w-4 text-neon-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agentVendors ? agentVendors.length : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Active AI Agent vendors
            </p>
          </CardContent>
        </Card>

        <Card className="hidden glassmorphic border-acid-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Interactions Today
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-acid-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"></div>
            <p className="text-xs text-muted-foreground">
              Conversations started
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Discovery */}
      <AgentDiscovery />
    </div>
  );
};

export default AgentMarketplace;
