
import { useState } from 'react';
import { type Agent } from '@/data/agents';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ChatModal from '@/components/chat/ChatModal';

const AgentCard = ({ agent }: { agent: Agent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Icon = agent.icon;

  return (
    <>
      <div className="relative group p-1 rounded-lg bg-gradient-to-b from-neon-blue/50 via-neon-purple/50 to-acid-green/50 hover:animate-border-glow">
        <div className="h-full w-full p-6 rounded-md glassmorphic bg-base-black flex flex-col space-y-4 transition-transform duration-300 group-hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-gradient-to-br from-base-black to-neon-purple/20`}>
              <Icon className={`h-8 w-8 ${agent.color}`} />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-bold">{agent.name}</h3>
              <p className={`text-sm font-bold ${agent.color}`}>{agent.role}</p>
            </div>
          </div>
          <p className="text-muted-foreground flex-grow">{agent.description}</p>
          <Button onClick={() => setIsModalOpen(true)} className={`w-full font-bold bg-opacity-80 hover:bg-opacity-100 ${
            agent.color === 'text-neon-blue' ? 'bg-neon-blue text-black hover:bg-neon-blue' :
            agent.color === 'text-neon-purple' ? 'bg-neon-purple text-white hover:bg-neon-purple' :
            'bg-acid-green text-black hover:bg-acid-green'
          }`}>
            Talk to Me <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <ChatModal agent={agent} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default AgentCard;
