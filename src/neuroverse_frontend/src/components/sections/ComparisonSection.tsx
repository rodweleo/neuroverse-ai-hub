
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const ComparisonSection = () => {
  const features = [
    {
      feature: "Data Ownership",
      neuroverse: true,
      traditional: false,
      description: "You own your AI agents and data permanently"
    },
    {
      feature: "Monetization",
      neuroverse: true,
      traditional: false,
      description: "Direct earnings from your AI creations"
    },
    {
      feature: "Censorship Resistance",
      neuroverse: true,
      traditional: false,
      description: "Your agents cannot be taken down or restricted"
    },
    {
      feature: "Transparency",
      neuroverse: true,
      traditional: false,
      description: "All interactions and payments are on-chain and verifiable"
    },
    {
      feature: "Global Access",
      neuroverse: true,
      traditional: false,
      description: "Available worldwide without regional restrictions"
    },
    {
      feature: "Community Governance",
      neuroverse: true,
      traditional: false,
      description: "Users have a say in platform development"
    }
  ];

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          Why Choose NeuroVerse?
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See how our decentralized approach compares to traditional AI platforms.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div></div>
          <Card className="glassmorphic border-neon-purple/40 bg-gradient-to-b from-neon-purple/10 to-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-orbitron holographic-text">NeuroVerse</CardTitle>
              <p className="text-neon-purple">Decentralized AI Platform</p>
            </CardHeader>
          </Card>
          <Card className="glassmorphic border-gray-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-orbitron text-gray-400">Traditional AI</CardTitle>
              <p className="text-gray-500">Centralized Platforms</p>
            </CardHeader>
          </Card>
        </div>
        
        <div className="space-y-4">
          {features.map((item, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-right">
                <h3 className="text-lg font-semibold">{item.feature}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex justify-center">
                {item.neuroverse ? (
                  <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-neon-purple" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {item.traditional ? (
                  <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-neon-purple" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
