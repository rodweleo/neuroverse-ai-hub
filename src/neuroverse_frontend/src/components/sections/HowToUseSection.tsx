import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MessageCircle, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const HowToUseSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse Agents",
      description:
        "Discover powerful AI agents tailored to your needs & are ready to work, learn, and assist you.",
    },
    {
      icon: MessageCircle,
      title: "Interact & Test",
      description:
        "Talk to AI agents instantly. See what they can do before building your own.",
    },
    {
      icon: Rocket,
      title: "Deploy Your Own Agent",
      description:
        "Easily build and launch your own AI—personalized with your prompts, knowledge, and tools. Monetize it your way.",
    },
    {
      icon: Rocket,
      title: "Launch & Earn",
      description:
        "Go live with your AI agent. Share it, scale it, and earn from every interaction.",
    },
  ];

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          How It Works
        </h2>
        <p className="text-md sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Get started with NeuroVerse in three simple steps and join the
          decentralized AI revolution.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card className="glassmorphic border-neon-blue/20 hover:border-neon-purple/40 transition-all duration-300 h-full flex items-end cursor-pointer">
              <div className="flex items-end justify-between">
                <CardHeader>
                  <CardTitle className="text-3xl font-orbitron flex flex-col gap-6">
                    <span className="text-6xl font-orbitron ">
                      0{index + 1}
                    </span>
                    <span className="font-bold">{step.title}</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-lg">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="size-12 p-2 rounded-[50%] bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 flex items-center justify-center relative">
                    <step.icon className="h-10 w-10 text-neon-blue" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          className="font-bold bg-neon-blue/80 hover:bg-neon-blue text-black text-lg px-8 py-6"
          asChild
        >
          <Link to="/deploy">
            Create Your First Agent
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HowToUseSection;
