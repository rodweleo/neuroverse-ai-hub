
import { Card, CardContent } from "@/components/ui/card";
import { Users, Bot, MessageCircle, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const StatsSection = () => {
  const [counts, setCounts] = useState({
    agents: 0,
    users: 0,
    conversations: 0,
    earnings: 0
  });

  const finalCounts = {
    agents: 247,
    users: 12400,
    conversations: 89000,
    earnings: 45000
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalCounts).map(key => {
      const target = finalCounts[key as keyof typeof finalCounts];
      const increment = target / steps;
      let current = 0;
      let step = 0;

      return setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          current = target;
        }
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const stats = [
    {
      icon: Bot,
      label: "AI Agents",
      value: counts.agents,
      suffix: "+",
      color: "text-neon-blue"
    },
    {
      icon: Users,
      label: "Active Users",
      value: counts.users,
      suffix: "+",
      color: "text-neon-purple"
    },
    {
      icon: MessageCircle,
      label: "Conversations",
      value: counts.conversations,
      suffix: "+",
      color: "text-acid-green"
    },
    {
      icon: TrendingUp,
      label: "Total Earnings",
      value: counts.earnings,
      suffix: " ICP",
      color: "text-neon-blue"
    }
  ];

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          Powered by Community
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join thousands of users creating and interacting with AI agents in our decentralized ecosystem.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glassmorphic border-neon-blue/20 text-center">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 flex items-center justify-center`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-orbitron font-bold holographic-text">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
