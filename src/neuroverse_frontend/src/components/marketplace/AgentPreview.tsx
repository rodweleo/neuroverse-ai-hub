
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import { Agent } from '../../../../declarations/neuroverse_backend/neuroverse_backend.did';

interface AgentPreviewProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: () => void;
}

const AgentPreview = ({ agent, isOpen, onClose, onStartChat }: AgentPreviewProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'examples' | 'reviews'>('overview');

  // Mock data for demonstration
  const mockExamples = [
    {
      id: 1,
      user: "How can you help me with stress management?",
      agent: "I can guide you through various stress management techniques including breathing exercises, mindfulness practices, and cognitive strategies. Would you like to start with a quick 5-minute breathing exercise?"
    },
    {
      id: 2,
      user: "I'm feeling overwhelmed at work.",
      agent: "I understand that feeling. Let's break this down together. Can you tell me what specifically is making you feel overwhelmed? Is it the workload, deadlines, or perhaps workplace relationships?"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] glassmorphic border-neon-blue/30 flex flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-orbitron font-bold">{agent.name}</h2>
              <p className={`text-sm font-bold`}>{agent.category}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-neon-blue/20">
            {['overview', 'examples', 'reviews'].map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                onClick={() => setActiveTab(tab as any)}
                className={`capitalize px-6 py-2 rounded-none border-b-2 transition-colors ${activeTab === tab
                  ? 'border-neon-blue text-neon-blue'
                  : 'border-transparent hover:text-foreground'
                  }`}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{agent.description}</p>

                <div className="space-y-3">
                  <h4 className="font-semibold">Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Emotional Support</Badge>
                    <Badge variant="secondary">Active Listening</Badge>
                    <Badge variant="secondary">Stress Management</Badge>
                    <Badge variant="secondary">Goal Setting</Badge>
                    <Badge variant="secondary">Mindfulness</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Best for</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Managing daily stress and anxiety</li>
                    <li>Processing difficult emotions</li>
                    <li>Developing coping strategies</li>
                    <li>Building emotional resilience</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Here are some example conversations to help you understand how this agent responds:
                </p>
                {mockExamples.map((example) => (
                  <div key={example.id} className="glassmorphic border border-neon-blue/20 rounded-lg p-4 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neon-blue">You</p>
                          <p className="text-sm">{example.user}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-neon-purple rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neon-purple">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{example.agent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">

              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-neon-blue/20">
            <Button
              onClick={onStartChat}
              className={`flex-1 font-bold bg-acid-green text-black hover:bg-acid-green/80`}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Conversation
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentPreview;
