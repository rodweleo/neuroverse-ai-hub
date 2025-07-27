import AgentCreationForm from "@/components/agent/AgentCreationForm";

const DeployAgentPage = () => {
  return (
    <div className="container py-8 space-y-8">
      <header className="flex items-end justify-between h-60 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-bold holographic-text py-2">
            Create Your AI Agent
          </h1>
          <p className="text-muted-foreground text-md sm:text-lg">
            Design a unique AI personality with custom knowledge and deploy it
            to the decentralized web
          </p>
        </div>
      </header>
      <AgentCreationForm />
    </div>
  );
};

export default DeployAgentPage;
