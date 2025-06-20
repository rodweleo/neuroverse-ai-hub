
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MessageCircle, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const HowToUseSection = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Browse Agents",
      description: "Explore our marketplace of AI agents, each with unique capabilities and specializations."
    },
    {
      icon: MessageCircle,
      step: "02",
      title: "Interact & Test",
      description: "Chat with agents to test their capabilities before deploying or creating your own."
    },
    {
      icon: Rocket,
      step: "03",
      title: "Deploy Your Own",
      description: "Create and deploy your custom AI agent with personalized prompts and monetization."
    }
  ];

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          How It Works
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get started with NeuroVerse in three simple steps and join the decentralized AI revolution.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card className="glassmorphic border-neon-blue/20 hover:border-neon-purple/40 transition-all duration-300 text-center h-full">
              <CardHeader>
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mb-4 relative">
                  <step.icon className="h-10 w-10 text-neon-blue" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-neon-purple text-black text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <CardTitle className="text-2xl font-orbitron">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-lg">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-neon-purple" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button size="lg" className="font-bold bg-neon-blue/80 hover:bg-neon-blue text-black text-lg px-8 py-6" asChild>
          <Link to="/deploy">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HowToUseSection;
