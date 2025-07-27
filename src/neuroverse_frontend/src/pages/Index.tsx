import HolographicRobot3D from "@/components/hero/HolographicRobot3D";
import ServicesSection from "@/components/sections/ServicesSection";
import HowToUseSection from "@/components/sections/HowToUseSection";
import FAQSection from "@/components/sections/FAQSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import { Button } from "@/components/ui/button";
import { Rocket, Play, Zap, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import useAllAgentVendors from "@/hooks/useAllAgentVendors";

// Lazy load heavy components
const LazyAgentGrid = lazy(() => import("@/components/home/AgentGrid"));

const Index = () => {
  const { data: agentVendors } = useAllAgentVendors();

  return (
    <div className="space-y-20">
      {/* Background Effects
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-acid-green/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,240,255,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(155,93,229,0.15),transparent_50%)]"></div> */}

      {/* Immersive Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-lg  ">
        <div className="relative z-10 container">
          <div className="grid xl:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphic border border-neon-blue/30">
                <Zap className="h-4 w-4 text-neon-blue animate-pulse" />
                <span className="text-sm font-medium text-neon-blue">
                  Free to Start • No Coding Required
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-orbitron font-bold leading-tight">
                  <span className="block">NeuroVerse</span>
                  <span className="block text-white mt-2">AI Agents</span>
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Explore a decentralized universe of AI agents. Interact with
                  them, deploy your own, and shape the future of intelligence on
                  the blockchain.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="font-bold bg-neon-purple hover:bg-neon-purple/80 text-white text-lg px-8 py-6 btn-focus transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link to="/deploy" aria-label="Deploy your first AI agent">
                      <Rocket className="mr-3 h-6 w-6" />
                      Deploy Your Agent
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-neon-purple text-white hover:bg-neon-purple/50 bg-transparent text-lg px-8 py-6 btn-focus transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link
                      to="/agent-marketplace"
                      aria-label="Try live demo of AI agents"
                    >
                      <Play className="mr-3 h-6 w-6" />
                      Try Live Demo
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-acid-green rounded-full animate-pulse"></div>
                  <span>Deploy in Minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                  <span>Earn ICP Tokens</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                  <span>100% Decentralized</span>
                </div>
              </div>

              {/* Social Proof */}
              {agentVendors ? (
                agentVendors.length > 5 ? (
                  <div className="flex items-center space-x-6 pt-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple border-2 border-background flex items-center justify-center"
                          >
                            <Users className="h-4 w-4 text-white" />
                          </div>
                        ))}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <span className="text-white font-semibold">
                          {agentVendors.length}+
                        </span>{" "}
                        agent creators
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>

            {/* Right Content - 3D Robot */}
            <div className=" hidden relative lg:h-[700px] h-[500px] xl:flex items-center justify-center">
              <div
                className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-acid-green/10 rounded-full blur-3xl animate-pulse"
                aria-hidden="true"
              ></div>
              <div
                className="relative z-10 w-full h-full"
                role="img"
                aria-label="Interactive 3D holographic robot"
              >
                <img
                  src="/logo.png"
                  alt="NeuroVerse"
                  className="size-xl rounded-full absolute left-20 top-20 select-none"
                />
                <HolographicRobot3D />
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-10 right-10 glassmorphic border border-neon-blue/30 rounded-lg p-3 backdrop-blur-md">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-acid-green rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">
                    AI Online
                  </span>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 glassmorphic border border-neon-purple/30 rounded-lg p-3 backdrop-blur-md">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-neon-purple" />
                  <span className="text-xs text-muted-foreground">
                    Blockchain Secured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-blue rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-acid-green rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-neon-blue rounded-full animate-pulse opacity-70 animation-delay-1000"></div>
        </div>

        <div className="bg-black h-full w-full inset-0 absolute" />
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* How to Use Section */}
      <HowToUseSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Agent Grid with Lazy Loading */}
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-orbitron font-bold holographic-text">
            Discover AI Agents
          </h2>
          <p className="text-md sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our collection of intelligent agents, each specialized for
            different tasks and powered by advanced AI models.
          </p>
        </div>
        <Suspense
          fallback={
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="status"
              aria-label="Loading AI agents"
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="glassmorphic border-neon-blue/20 rounded-lg p-6 skeleton"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-neon-blue/20 rounded-full"></div>
                    <div className="h-4 bg-neon-blue/20 rounded w-3/4"></div>
                    <div className="h-3 bg-neon-blue/10 rounded w-full"></div>
                    <div className="h-3 bg-neon-blue/10 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
              <span className="sr-only">Loading AI agents...</span>
            </div>
          }
        >
          <LazyAgentGrid />
        </Suspense>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default Index;
