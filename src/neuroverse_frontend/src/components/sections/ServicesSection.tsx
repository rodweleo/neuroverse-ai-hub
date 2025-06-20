
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Shield, Coins } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI-Powered Agents",
      description: "Deploy sophisticated AI agents with custom personalities and specialized knowledge domains."
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Launch your AI agent in seconds with our streamlined deployment process on ICP."
    },
    {
      icon: Shield,
      title: "Decentralized & Secure",
      description: "Built on Internet Computer Protocol for maximum security and decentralization."
    },
    {
      icon: Coins,
      title: "Monetize Your Agents",
      description: "Earn from your AI creations through our integrated payment and analytics system."
    }
  ];

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          Our Services
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to create, deploy, and monetize AI agents in the decentralized web.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="glassmorphic border-neon-blue/20 hover:border-neon-purple/40 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mb-4">
                <service.icon className="h-8 w-8 text-neon-blue" />
              </div>
              <CardTitle className="text-xl font-orbitron">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-muted-foreground">
                {service.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
