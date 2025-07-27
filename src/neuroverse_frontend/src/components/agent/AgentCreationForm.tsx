import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Settings, FileText, Puzzle, ALargeSmall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import KnowledgeBaseManager, { KnowledgeConfig } from "./KnowledgeBaseManager";
import { KnowledgeDocument } from "./DocumentUpload";
import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/use-auth-client";
import AuthBtn from "@/components/auth/auth-btn";
import { useAllTools } from "@/hooks/use-all-tools";
import { Link } from "react-router-dom";

interface AgentFormData {
  name: string;
  description: string;
  category: string;
  systemPrompt: string;
  icon: string;
  color: string;
  price: number;
  temperature: number;
  maxTokens: number;
  knowledgeBase: KnowledgeDocument[];
  knowledgeConfig: KnowledgeConfig;
  isFree: boolean;
  tools: string[];
}

const AgentCreationForm = () => {
  const { principal, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { data: availableTools } = useAllTools();

  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    description: "",
    category: "",
    systemPrompt: "",
    icon: "Bot",
    color: "text-neon-blue",
    price: 0.1,
    temperature: 0.7,
    maxTokens: 1000,
    knowledgeBase: [],
    knowledgeConfig: {
      maxContextLength: 4000,
      searchSensitivity: 0.7,
      citationsEnabled: true,
      chunkSize: 1000,
      overlap: 200,
    },
    isFree: true,
    tools: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toolSearchQuery, setToolSearchQuery] = useState("");

  const roleTemplates = [
    {
      role: "Therapist",
      prompt:
        "You are a compassionate and empathetic therapist. Your goal is to listen actively, ask thoughtful questions, and guide users through their feelings. Never give direct medical advice, but help them find their own answers and coping strategies. Always be supportive and non-judgmental.",
      icon: "Stethoscope",
      color: "text-neon-purple",
    },
    {
      role: "Tutor",
      prompt:
        "You are a knowledgeable and patient tutor. Explain complex concepts in simple, easy-to-understand ways. Use analogies, examples, and step-by-step breakdowns. Always be encouraging and adapt your teaching style to the student's learning pace.",
      icon: "GraduationCap",
      color: "text-acid-green",
    },
    {
      role: "Creative Writer",
      prompt:
        "You are an inspiring creative writing assistant. Help users craft compelling stories, improve their writing, and overcome creative blocks. Provide constructive feedback, suggest plot ideas, and help develop characters. Be imaginative and encouraging.",
      icon: "Palette",
      color: "text-neon-purple",
    },
    {
      role: "Code Mentor",
      prompt:
        "You are an experienced programming mentor. Help users learn to code, debug issues, and understand software development concepts. Explain code clearly, suggest best practices, and guide problem-solving. Be patient and encouraging with beginners.",
      icon: "Code",
      color: "text-neon-blue",
    },
    {
      role: "Life Coach",
      prompt:
        "You are a supportive life coach focused on helping users achieve their goals and improve their well-being. Ask powerful questions, help identify obstacles, and guide users toward actionable steps. Be motivational and help build confidence.",
      icon: "Heart",
      color: "text-acid-green",
    },
    {
      role: "Research Assistant",
      prompt:
        "You are a thorough research assistant who helps users find information, analyze data, and understand complex topics. Provide accurate, well-sourced information and help break down research into digestible insights.",
      icon: "Brain",
      color: "text-neon-blue",
    },
  ];

  const handleTemplateSelect = (template: (typeof roleTemplates)[0]) => {
    setFormData((prev) => ({
      ...prev,
      category: template.role,
      systemPrompt: template.prompt,
      icon: template.icon,
      color: template.color,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.name ||
      !formData.description ||
      !formData.systemPrompt ||
      !formData.price
    ) {
      toast({
        title: "Validation Error",
        description: `Please fill in all required fields: Name, Description, System Prompt, Category, Price`,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await NeuroverseBackendActor.createAgent(
        Date.now().toString(),
        formData.name,
        formData.category,
        formData.description,
        formData.systemPrompt,
        formData.isFree,
        true,
        BigInt(formData.price),
        principal,
        formData.tools.length > 0,
        formData.tools
      );

      toast({
        title: "Agent Created Successfully!",
        description: `${formData.name} has been deployed on the NeuroVerse.`,
      });

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toast({
        title: "Agent creation error",
        description: "Something went wrong!",
        variant: "destructive",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      systemPrompt: "",
      icon: "Bot",
      color: "text-neon-blue",
      price: 0.1,
      temperature: 0.7,
      maxTokens: 1000,
      knowledgeBase: [],
      knowledgeConfig: {
        maxContextLength: 4000,
        searchSensitivity: 0.7,
        citationsEnabled: true,
        chunkSize: 1000,
        overlap: 200,
      },
      isFree: true,
      tools: [],
    });
  };

  const filteredTools = availableTools
    ? availableTools.filter((tool) => {
        return (tool.name + " " + tool.description).includes(toolSearchQuery);
      })
    : [];

  const handleSearchTool = (e) => {
    setToolSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-8 ">
      {/* Agent Creation Form */}
      <Card className="glassmorphic border-neon-blue/20">
        <CardHeader>
          <CardTitle className="holographic-text">
            Agent Configuration
          </CardTitle>
          <CardDescription>
            Customize your agent's personality, knowledge, and behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 glassmorphic">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Basic Settings
                </TabsTrigger>
                <TabsTrigger
                  value="knowledge"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Knowledge Base
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Puzzle className="h-4 w-4" />
                  Tools
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="basic"
                className="space-y-6 mt-6 outline-none focus:outline-none focus:border-none"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-bold">
                      Agent Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="e.g., MindWell, CogniTutor"
                      className="bg-black/20 focus:ring-neon-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-lg font-bold ">
                      Role/Category
                    </Label>
                    <Input
                      id="role"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      placeholder="e.g., Therapist, Tutor, Assistant"
                      className="bg-black/20 focus:ring-neon-blue"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-bold">
                    Description *
                  </Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="A brief description of what your agent does"
                    className="bg-black/20 focus:ring-neon-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemPrompt" className="text-lg font-bold ">
                    System Prompt *
                  </Label>
                  <Textarea
                    id="systemPrompt"
                    value={formData.systemPrompt}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        systemPrompt: e.target.value,
                      }))
                    }
                    placeholder="You are a helpful assistant that..."
                    rows={6}
                    className="bg-black/20 focus:ring-neon-blue"
                  />
                  <p className="text-sm text-muted-foreground">
                    This defines your agent's personality and behavior. Be
                    specific about tone, expertise, and interaction style.
                  </p>
                </div>

                <div className="flex gap-2 -space-y-[6px]">
                  <Checkbox
                    defaultChecked
                    onCheckedChange={(checked) => {
                      setFormData((prev) => ({
                        ...prev,
                        isFree: checked as boolean,
                      }));
                    }}
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-neon-purple data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="">
                    <Label
                      htmlFor="systemPrompt"
                      className="text-lg font-bold "
                    >
                      Enable Fremium Agent Subscription *
                    </Label>

                    <p className="text-sm text-muted-foreground">
                      This defines your agent's accessibility. This depicts if
                      it will be a fremium subscription or charged.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricing" className="text-lg font-bold">
                    Price (ICP)
                  </Label>
                  <Input
                    id="pricing"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="bg-black/20 focus:ring-neon-blue"
                  />
                </div>
              </TabsContent>

              <TabsContent value="knowledge" className="mt-6">
                <KnowledgeBaseManager
                  documents={formData.knowledgeBase}
                  onDocumentsChange={(documents) =>
                    setFormData((prev) => ({
                      ...prev,
                      knowledgeBase: documents,
                    }))
                  }
                  config={formData.knowledgeConfig}
                  onConfigChange={(config) =>
                    setFormData((prev) => ({
                      ...prev,
                      knowledgeConfig: config,
                    }))
                  }
                />
              </TabsContent>

              <TabsContent value="tools" className="space-y-6 mt-6">
                <div>
                  <h1 className="font-bold text-2xl">
                    Choose Tools for Your Agent
                  </h1>
                  <p className="text-muted-foreground">
                    Your agent will be able to utilize these tools at runtime.
                  </p>
                </div>
                <div className="space-y-6">
                  <Input
                    type="search"
                    placeholder="Search tool"
                    onChange={(e) => handleSearchTool(e)}
                  />
                  <ul className="space-y-4">
                    {filteredTools.map((tool, idx: number) => (
                      <li
                        key={`tool-${idx}`}
                        className="bg-gray-900 p-4 rounded-md w-full max-w-sm"
                      >
                        <div key={tool.id} className="flex items-center gap-4">
                          <Checkbox
                            checked={formData.tools.includes(
                              tool.id.toString()
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  tools: [...prev.tools, tool.id.toString()],
                                }));
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  tools: prev.tools.filter(
                                    (value) => value !== tool.id.toString()
                                  ),
                                }));
                              }
                            }}
                          />
                          <div className="-mt-2 flex flex-col w-full">
                            <div className="flex items-center gap-4 justify-between w-full">
                              <Label
                                htmlFor="toggle"
                                className="font-bold text-lg"
                              >
                                {tool.name}
                              </Label>
                              <p className="text-muted-foreground">
                                {tool.tool_type}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-end gap-4 *:bg-slate-200">
                  {/* <Button>Create Custom Tool</Button> */}
                  <Link to="/tools-marketplace">
                    <Button>Browse Marketplace</Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>

            {isAuthenticated ? (
              <Button
                type="submit"
                size="lg"
                className="w-full font-bold bg-neon-purple/80 hover:bg-neon-purple text-white disabled:bg-slate-500 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Rocket className="h-5 w-5" />
                )}
                Deploy Agent
              </Button>
            ) : (
              <AuthBtn className="w-full" />
            )}
          </form>
        </CardContent>
      </Card>

      {/* Template Selection */}
      <Card className="glassmorphic border-neon-purple/20">
        <CardHeader>
          <CardTitle className="holographic-text">
            Quick Start Templates
          </CardTitle>
          <CardDescription>
            Choose a template to get started quickly, or create from scratch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleTemplates.map((template) => (
              <Button
                key={template.role}
                variant="outline"
                className="h-auto p-4 border-neon-blue/20 hover:border-neon-purple/40 text-left"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="w-full">
                  <div className="font-bold mb-1">{template.role}</div>
                  <div className="text-sm text-muted-foreground break-normal whitespace-normal">
                    {template.prompt}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCreationForm;
