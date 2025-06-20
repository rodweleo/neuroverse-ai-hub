
import { useState } from 'react';
import { type Agent } from '@/data/agents';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, Share, Star, Users, Eye } from 'lucide-react';
import { userService } from '@/services/userService';
import { useToast } from '@/hooks/use-toast';
import ChatModal from '@/components/chat/ChatModal';
import AgentPreview from './AgentPreview';

interface EnhancedAgentCardProps {
  agent: Agent;
  showSocialFeatures?: boolean;
}

const EnhancedAgentCard = ({ agent, showSocialFeatures = true }: EnhancedAgentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(userService.isFavoriteAgent(agent.id));
  const { toast } = useToast();
  const Icon = agent.icon;

  const handleFavorite = () => {
    const wasAdded = userService.toggleFavoriteAgent(agent.id);
    setIsFavorited(wasAdded);
    
    toast({
      title: wasAdded ? "Added to Favorites" : "Removed from Favorites",
      description: `${agent.name} has been ${wasAdded ? 'added to' : 'removed from'} your favorites.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${agent.name} - NeuroVerse Agent`,
          text: agent.description,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Agent link has been copied to your clipboard.",
      });
    }
  };

  const handleStartChat = () => {
    setIsPreviewOpen(false);
    setIsModalOpen(true);
  };

  // Mock data for demonstration
  const mockStats = {
    rating: 4.8,
    interactions: 1247,
    users: 342,
    responseTime: "2.3s"
  };

  return (
    <>
      <div className="relative group p-1 rounded-lg bg-gradient-to-b from-neon-blue/50 via-neon-purple/50 to-acid-green/50 hover:animate-border-glow">
        <div className="h-full w-full p-6 rounded-md glassmorphic bg-base-black flex flex-col space-y-4 transition-transform duration-300 group-hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-gradient-to-br from-base-black to-neon-purple/20`}>
                <Icon className={`h-8 w-8 ${agent.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-orbitron font-bold">{agent.name}</h3>
                <p className={`text-sm font-bold ${agent.color}`}>{agent.role}</p>
              </div>
            </div>
            
            {showSocialFeatures && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavorite}
                  className={`h-8 w-8 p-0 ${isFavorited ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <p className="text-muted-foreground flex-grow text-sm leading-relaxed">
            {agent.description}
          </p>

          {/* Enhanced Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{mockStats.rating}</span>
                <span className="text-muted-foreground/60">({mockStats.users} reviews)</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {mockStats.interactions} chats
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{mockStats.users} users</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Avg response: {mockStats.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewOpen(true)}
              className="w-full border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview Agent
            </Button>
            
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className={`w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 ${
                agent.color === 'text-neon-blue' ? 'bg-neon-blue text-black hover:bg-neon-blue' :
                agent.color === 'text-neon-purple' ? 'bg-neon-purple text-white hover:bg-neon-purple' :
                'bg-acid-green text-black hover:bg-acid-green'
              }`}
            >
              Start Conversation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <AgentPreview
        agent={agent}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onStartChat={handleStartChat}
      />
      
      <ChatModal agent={agent} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default EnhancedAgentCard;
