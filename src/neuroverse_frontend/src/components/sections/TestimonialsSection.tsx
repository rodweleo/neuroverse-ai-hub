
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "AI Developer",
      avatar: "AC",
      content: "NeuroVerse made it incredibly easy to deploy my first AI agent. The blockchain integration is seamless and the earning potential is amazing!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "SJ",
      content: "I've been using the therapy and tutor agents daily. The quality of interactions is outstanding and feels genuinely helpful.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Entrepreneur",
      avatar: "MR",
      content: "The decentralized approach gives me confidence in the platform's future. Already earning passive income from my deployed agents.",
      rating: 5
    }
  ];

  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
          What Our Users Say
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Real feedback from our community of AI enthusiasts and creators.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="glassmorphic border-neon-blue/20 hover:border-neon-purple/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-neon-blue text-neon-blue" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
