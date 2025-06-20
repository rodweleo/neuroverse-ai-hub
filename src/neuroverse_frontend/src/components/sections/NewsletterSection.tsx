
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Mail, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to NeuroVerse! 🎉",
      description: "Check your email for exclusive early access benefits.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="container py-20">
      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphic border-neon-purple/40 bg-gradient-to-r from-neon-purple/5 via-neon-blue/5 to-acid-green/5">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-neon-purple" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold holographic-text">
                  Join the AI Revolution
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get exclusive early access, development updates, and special offers for NeuroVerse agents.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-acid-green" />
                  <span className="text-sm">Free Premium Credits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-neon-blue" />
                  <span className="text-sm">Early Agent Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-neon-purple" />
                  <span className="text-sm">Development Updates</span>
                </div>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-black/20 border-neon-blue/20 focus:border-neon-purple/40"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-neon-purple/80 hover:bg-neon-purple text-white font-bold px-8"
                >
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe anytime. By signing up, you agree to receive updates about NeuroVerse.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;
