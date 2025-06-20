
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, MessageCircle, Sparkles } from 'lucide-react';
import { agents } from '@/data/agents';
import ChatModal from '@/components/chat/ChatModal';

const TryDemoSection = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const demoConversations = [
    {
      user: "Hi there! How are you doing today?",
      agent: "Hello! I'm doing well, thank you for asking. I'm here and ready to help you with whatever you need. How are you feeling today?"
    },
    {
      user: "I've been feeling a bit stressed lately.",
      agent: "I understand that stress can be really challenging. It's actually quite common, and I'm glad you're reaching out. Would you like to talk about what's been causing you stress?"
    },
    {
      user: "Work has been overwhelming.",
      agent: "Work-related stress is something many people experience. It sounds like you're dealing with quite a lot right now. Can you tell me more about what specifically feels overwhelming?"
    }
  ];

  return (
    <div className="container py-16">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphic border border-neon-purple/30">
          <Sparkles className="h-4 w-4 text-neon-purple animate-pulse" />
          <span className="text-sm font-medium text-neon-purple">Interactive Demo</span>
        </div>
        <h2 className="text-4xl font-orbitron font-bold holographic-text">
          Try Before You Commit
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See how our AI agents work with real conversation examples, then try it yourself.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Demo Conversation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center mb-6">Example Conversation</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {demoConversations.map((exchange, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-xs glassmorphic border border-neon-blue/20 rounded-lg px-4 py-2">
                    <p className="text-sm">{exchange.user}</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-xs glassmorphic border border-neon-purple/20 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                      <span className="text-xs text-neon-purple font-medium">{selectedAgent.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{exchange.agent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Selection & Try Demo */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-center mb-6">Choose an Agent to Try</h3>
          
          <div className="space-y-3">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <Card 
                  key={agent.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedAgent.id === agent.id 
                      ? 'ring-2 ring-neon-blue glassmorphic border-neon-blue/40' 
                      : 'glassmorphic border-neon-blue/20 hover:border-neon-blue/40'
                  }`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-base-black to-neon-purple/20">
                        <Icon className={`h-6 w-6 ${agent.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">{agent.role}</p>
                      </div>
                      {selectedAgent.id === agent.id && (
                        <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => setIsChatOpen(true)}
              className={`w-full font-bold text-lg py-6 ${
                selectedAgent.color === 'text-neon-blue' ? 'bg-neon-blue text-black hover:bg-neon-blue/80' :
                selectedAgent.color === 'text-neon-purple' ? 'bg-neon-purple text-white hover:bg-neon-purple/80' :
                'bg-acid-green text-black hover:bg-acid-green/80'
              }`}
            >
              <Play className="mr-3 h-5 w-5" />
              Try {selectedAgent.name} Now
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>No signup required • Free demo • Real AI responses</p>
            </div>
          </div>
        </div>
      </div>

      <ChatModal 
        agent={selectedAgent} 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
      />
    </div>
  );
};

export default TryDemoSection;
