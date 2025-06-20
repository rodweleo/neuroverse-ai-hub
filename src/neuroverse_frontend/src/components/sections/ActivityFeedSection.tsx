
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, MessageCircle, Zap, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Activity {
  id: string;
  type: 'conversation' | 'deployment' | 'earning' | 'interaction';
  user: string;
  agent: string;
  timestamp: Date;
  amount?: number;
}

const ActivityFeedSection = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  // Simulate real-time activity feed
  useEffect(() => {
    const generateActivity = (): Activity => {
      const types: Activity['type'][] = ['conversation', 'deployment', 'earning', 'interaction'];
      const users = ['Alex C.', 'Sarah J.', 'Marcus R.', 'Emma L.', 'David K.', 'Lisa M.'];
      const agents = ['Therapy Bot', 'Math Tutor', 'Creative Writer', 'Code Helper', 'Finance Advisor', 'Fitness Coach'];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        user: users[Math.floor(Math.random() * users.length)],
        agent: agents[Math.floor(Math.random() * agents.length)],
        timestamp: new Date(),
        amount: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 1 : undefined
      };
    };

    // Initial activities
    const initial = Array.from({ length: 8 }, generateActivity);
    setActivities(initial);

    // Add new activity every few seconds
    const interval = setInterval(() => {
      setActivities(prev => [generateActivity(), ...prev.slice(0, 7)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'conversation':
        return <MessageCircle className="h-4 w-4 text-neon-blue" />;
      case 'deployment':
        return <Bot className="h-4 w-4 text-neon-purple" />;
      case 'earning':
        return <TrendingUp className="h-4 w-4 text-acid-green" />;
      case 'interaction':
        return <Zap className="h-4 w-4 text-neon-blue" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'conversation':
        return `started a conversation with ${activity.agent}`;
      case 'deployment':
        return `deployed a new agent: ${activity.agent}`;
      case 'earning':
        return `earned ${activity.amount} ICP from ${activity.agent}`;
      case 'interaction':
        return `interacted with ${activity.agent}`;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          Live Activity Feed
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See what's happening in the NeuroVerse ecosystem in real-time.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphic border-neon-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-acid-green rounded-full animate-pulse"></div>
              Live Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
                  index === 0 ? 'bg-neon-blue/5 border border-neon-blue/20' : 'hover:bg-white/5'
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-neon-purple/20 text-neon-purple text-xs">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm">
                    {getActivityIcon(activity.type)}
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground">
                      {getActivityText(activity)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {activity.amount && (
                    <Badge variant="outline" className="border-acid-green/20 text-acid-green">
                      +{activity.amount} ICP
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ActivityFeedSection;
