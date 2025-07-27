import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Zap, Shield, Coins } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI-Powered Agents",
      description:
        "Deploy sophisticated AI agents with custom personalities and specialized knowledge domains.",
      cta: {
        href: "/agent-marketplace",
        label: "Explore AI agents",
      },
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description:
        "Launch your AI agent in seconds with our streamlined deployment process on ICP.",
      cta: {
        href: "/deploy",
        label: "Deploy your agent",
      },
    },
    {
      icon: Shield,
      title: "Decentralized & Secure",
      description:
        "Built on Internet Computer Protocol for maximum security and decentralization.",
      cta: {
        href: "https://internetcomputer.org",
        label: "Learn More",
      },
    },
    {
      icon: Coins,
      title: "Monetize Your Agents",
      description:
        "Earn from your AI creations through our integrated payment and analytics system.",
      cta: {
        href: "/deploy",
        label: "Start your journey",
      },
    },
  ];

  return (
    <section className="container py-20 space-y-12">
      <div className="flex flex-wrap gap-4 items-end justify-between">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
            Our Services
          </h2>
          <p className="text-md sm:text-xl text-muted-foreground">
            Everything you need to create, deploy, and monetize AI agents in the
            decentralized web.
          </p>
        </div>
        <Link to="/deploy">
          <Button className="bg-neon-purple/80 hover:bg-neon-purple/70 text-white font-bold">
            Deploy your agent
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            className="glassmorphic border-neon-blue/20 hover:border-neon-purple/40 transition-all duration-300 hover:scale-105 w-full"
          >
            <CardHeader className="space-y-4">
              <service.icon className="size-12 text-neon-blue" />
              <CardTitle className="text-2xl md:text-4xl font-orbitron">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-md text-muted-foreground">
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link
                to={service.cta.href}
                target={!service.cta.href.startsWith("/") && "_blank"}
              >
                <Button className="bg-neon-purple/80 hover:bg-neon-purple/70 font-bold text-white">
                  {service.cta.label}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
