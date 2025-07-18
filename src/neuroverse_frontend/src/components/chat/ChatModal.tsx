
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Settings } from 'lucide-react';
import { conversationService, type ConversationMemory } from '@/services/conversationService';
import { analyticsService } from '@/services/analyticsService';
import { useToast } from '@/hooks/use-toast';
import { Agent } from '../../../../declarations/neuroverse_backend/neuroverse_backend.did';
import MessageBubble from './MessageBubble';
import MessageBubbleLoader from '../ui/message-bubble-loader';

interface ChatModalProps {
  agent: Agent;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatModal = ({ agent, isOpen, setIsOpen }: ChatModalProps) => {
  const [messages, setMessages] = useState<ConversationMemory['messages']>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Initialize conversation with agent greeting
      const greeting = {
        id: 'greeting',
        role: 'assistant' as const,
        content: `Hello! I'm ${agent.name}, your ${agent.category}. How can I help you today?`,
        timestamp: new Date()
      };

      setMessages([greeting]);
    } else {
      // Reset conversation when modal closes
      setMessages([]);
      setConversationId(undefined);
    }
  }, [isOpen, agent]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { response, conversationId: newConversationId } = await conversationService.sendMessage(
        agent.id.toString(),
        inputValue,
        conversationId
      );

      const assistantMessage = {
        id: Date.now().toString() + '_assistant',
        role: 'assistant' as const,
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationId(newConversationId);

      // Track analytics
      analyticsService.trackInteraction(agent.id, 1);

    } catch (error) {
      console.error('Chat error:', error);

      // Show specific error message for AI configuration
      if (error instanceof Error && error.message.includes('API key')) {
        toast({
          title: "AI Configuration Required",
          description: "Please configure your AI settings to enable real conversations.",
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                // In a real app, you'd navigate to settings
                window.location.href = '/settings';
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl h-full max-h-[80vh] glassmorphic border-neon-blue/20 flex flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle className="flex items-center gap-3">
            <span className="holographic-text text-xl">{agent.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1">
          <ScrollArea className="flex-1 pr-4 overflow-y-auto max-h-[65vh]" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <MessageBubble message={message} />
                </div>
              ))}
              {isLoading && (
                <MessageBubbleLoader />
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2 mt-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              disabled={isLoading}
              className="bg-black/20 border-neon-blue/20 focus:border-neon-blue"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-neon-blue/80 hover:bg-neon-blue text-black"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
