import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Brain,
  Briefcase,
  Heart,
  Lightbulb,
  Palette,
  Star,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  systemPrompt: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  downloads: number;
  creator: string;
}

const agentTemplates: AgentTemplate[] = [
  {
    id: "customer-support",
    name: "Customer Support Agent",
    description:
      "Friendly and helpful customer service representative that can handle inquiries, complaints, and provide product information.",
    category: "Business",
    icon: Briefcase,
    color: "text-neon-blue",
    systemPrompt:
      "You are a professional customer support representative. Be helpful, empathetic, and solution-oriented.",
    tags: ["customer-service", "business", "support"],
    difficulty: "Beginner",
    rating: 4.8,
    downloads: 1247,
    creator: "NeuroVerse Team",
  },
  {
    id: "creative-writer",
    name: "Creative Writing Assistant",
    description:
      "Inspiring creative writing companion that helps with storytelling, character development, and overcoming writer's block.",
    category: "Creative",
    icon: Palette,
    color: "text-neon-purple",
    systemPrompt:
      "You are a creative writing assistant. Help users develop compelling stories, characters, and overcome creative blocks.",
    tags: ["writing", "creative", "storytelling"],
    difficulty: "Intermediate",
    rating: 4.9,
    downloads: 892,
    creator: "CreativeAI Labs",
  },
  {
    id: "life-coach",
    name: "Personal Life Coach",
    description:
      "Motivational life coach that provides guidance on goal setting, personal development, and achieving work-life balance.",
    category: "Wellness",
    icon: Heart,
    color: "text-acid-green",
    systemPrompt:
      "You are a supportive life coach. Help users set goals, overcome challenges, and develop positive habits.",
    tags: ["coaching", "motivation", "personal-development"],
    difficulty: "Advanced",
    rating: 4.7,
    downloads: 654,
    creator: "WellnessAI",
  },
  {
    id: "brainstorm-buddy",
    name: "Brainstorming Partner",
    description:
      "Creative ideation partner that helps generate innovative solutions and explores new possibilities for any challenge.",
    category: "Creative",
    icon: Lightbulb,
    color: "text-neon-purple",
    systemPrompt:
      "You are a creative brainstorming partner. Help users generate innovative ideas and explore creative solutions.",
    tags: ["brainstorming", "creativity", "innovation"],
    difficulty: "Beginner",
    rating: 4.6,
    downloads: 1156,
    creator: "IdeaForge",
  },
  {
    id: "tech-mentor",
    name: "Tech Career Mentor",
    description:
      "Experienced software engineer mentor providing career guidance, technical advice, and industry insights.",
    category: "Technology",
    icon: Brain,
    color: "text-neon-blue",
    systemPrompt:
      "You are a senior software engineer and mentor. Provide career guidance and technical insights.",
    tags: ["technology", "career", "mentoring"],
    difficulty: "Advanced",
    rating: 4.9,
    downloads: 743,
    creator: "TechMentors",
  },
  {
    id: "productivity-coach",
    name: "Productivity Optimizer",
    description:
      "Efficiency expert that helps optimize workflows, manage time effectively, and boost productivity.",
    category: "Business",
    icon: Zap,
    color: "text-acid-green",
    systemPrompt:
      "You are a productivity expert. Help users optimize their workflows and manage time effectively.",
    tags: ["productivity", "time-management", "efficiency"],
    difficulty: "Intermediate",
    rating: 4.5,
    downloads: 987,
    creator: "ProductivityPro",
  },
];

const AgentTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Business", "Creative", "Wellness", "Technology"];

  const filteredTemplates =
    selectedCategory === "All"
      ? agentTemplates
      : agentTemplates.filter(
          (template) => template.category === selectedCategory
        );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "Advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-orbitron font-bold holographic-text">
          Agent Templates
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jumpstart your agent creation with professionally designed templates
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Card
              key={template.id}
              className="glassmorphic border-neon-blue/20 hover:border-neon-purple/30 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-base-black to-neon-purple/20">
                      <Icon className={`h-6 w-6 ${template.color}`} />
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {template.description}
                </CardDescription>

                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground">
                  by {template.creator}
                </div>

                <Button
                  className="w-full bg-neon-purple/80 hover:bg-neon-purple text-white"
                  asChild
                >
                  <Link to={`/deploy?template=${template.id}`}>
                    Use Template
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AgentTemplates;
