import EnhancedAgentCard from "@/components/marketplace/EnhancedAgentCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useAllAgents from "@/hooks/useAllAgents";

const AgentGrid = () => {
  const { data: agents } = useAllAgents();

  // Show only first 3 agents on home page
  const featuredAgents = agents ? agents.slice(0, 3) : [];

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <h2 className="text-3xl font-orbitron font-bold holographic-text">
          Featured Agents
        </h2>
        <Button
          variant="outline"
          className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
          asChild
        >
          <Link to="/marketplace">
            View All Agents <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredAgents.length === 0 && (
          <div className="">No live agents found! Apologies partner :|</div>
        )}
        {featuredAgents.map((agent) => (
          <EnhancedAgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentGrid;
