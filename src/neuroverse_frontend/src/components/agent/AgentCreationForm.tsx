
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Brain, Stethoscope, GraduationCap, Bot, Palette, Code, Heart, Settings, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import KnowledgeBaseManager, { KnowledgeConfig } from './KnowledgeBaseManager';
import { KnowledgeDocument } from './DocumentUpload';

interface AgentFormData {
  name: string;
  description: string;
  role: string;
  systemPrompt: string;
  icon: string;
  color: string;
  pricing: number;
  temperature: number;
  maxTokens: number;
  knowledgeBase: KnowledgeDocument[];
  knowledgeConfig: KnowledgeConfig;
}

const AgentCreationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    description: '',
    role: '',
    systemPrompt: '',
    icon: 'Bot',
    color: 'text-neon-blue',
    pricing: 0.1,
    temperature: 0.7,
    maxTokens: 1000,
    knowledgeBase: [],
    knowledgeConfig: {
      maxContextLength: 4000,
      searchSensitivity: 0.7,
      citationsEnabled: true,
      chunkSize: 1000,
      overlap: 200
    }
  });

  const iconOptions = [
    { value: 'Bot', label: 'Bot', icon: Bot },
    { value: 'Brain', label: 'Brain', icon: Brain },
    { value: 'Stethoscope', label: 'Medical', icon: Stethoscope },
    { value: 'GraduationCap', label: 'Education', icon: GraduationCap },
    { value: 'Palette', label: 'Creative', icon: Palette },
    { value: 'Code', label: 'Technical', icon: Code },
    { value: 'Heart', label: 'Support', icon: Heart }
  ];

  const colorOptions = [
    { value: 'text-neon-blue', label: 'Neon Blue', preview: 'bg-neon-blue' },
    { value: 'text-neon-purple', label: 'Neon Purple', preview: 'bg-neon-purple' },
    { value: 'text-acid-green', label: 'Acid Green', preview: 'bg-acid-green' }
  ];

  const roleTemplates = [
    {
      role: 'Therapist',
      prompt: 'You are a compassionate and empathetic therapist. Your goal is to listen actively, ask thoughtful questions, and guide users through their feelings. Never give direct medical advice, but help them find their own answers and coping strategies. Always be supportive and non-judgmental.',
      icon: 'Stethoscope',
      color: 'text-neon-purple'
    },
    {
      role: 'Tutor',
      prompt: 'You are a knowledgeable and patient tutor. Explain complex concepts in simple, easy-to-understand ways. Use analogies, examples, and step-by-step breakdowns. Always be encouraging and adapt your teaching style to the student\'s learning pace.',
      icon: 'GraduationCap',
      color: 'text-acid-green'
    },
    {
      role: 'Creative Writer',
      prompt: 'You are an inspiring creative writing assistant. Help users craft compelling stories, improve their writing, and overcome creative blocks. Provide constructive feedback, suggest plot ideas, and help develop characters. Be imaginative and encouraging.',
      icon: 'Palette',
      color: 'text-neon-purple'
    },
    {
      role: 'Code Mentor',
      prompt: 'You are an experienced programming mentor. Help users learn to code, debug issues, and understand software development concepts. Explain code clearly, suggest best practices, and guide problem-solving. Be patient and encouraging with beginners.',
      icon: 'Code',
      color: 'text-neon-blue'
    },
    {
      role: 'Life Coach',
      prompt: 'You are a supportive life coach focused on helping users achieve their goals and improve their well-being. Ask powerful questions, help identify obstacles, and guide users toward actionable steps. Be motivational and help build confidence.',
      icon: 'Heart',
      color: 'text-acid-green'
    },
    {
      role: 'Research Assistant',
      prompt: 'You are a thorough research assistant who helps users find information, analyze data, and understand complex topics. Provide accurate, well-sourced information and help break down research into digestible insights.',
      icon: 'Brain',
      color: 'text-neon-blue'
    }
  ];

  const handleTemplateSelect = (template: typeof roleTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      role: template.role,
      systemPrompt: template.prompt,
      icon: template.icon,
      color: template.color
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.systemPrompt) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Enhanced agent data with knowledge base
    const agentData = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      lastModified: new Date(),
      version: 1,
    };

    // Save to local storage for demo
    const existingAgents = JSON.parse(localStorage.getItem('custom_agents') || '[]');
    existingAgents.push(agentData);
    localStorage.setItem('custom_agents', JSON.stringify(existingAgents));

    toast({
      title: "Agent Created Successfully!",
      description: `${formData.name} has been deployed to the NeuroVerse with ${formData.knowledgeBase.length} knowledge documents.`,
    });

    // Reset form
    setFormData({
      name: '',
      description: '',
      role: '',
      systemPrompt: '',
      icon: 'Bot',
      color: 'text-neon-blue',
      pricing: 0.1,
      temperature: 0.7,
      maxTokens: 1000,
      knowledgeBase: [],
      knowledgeConfig: {
        maxContextLength: 4000,
        searchSensitivity: 0.7,
        citationsEnabled: true,
        chunkSize: 1000,
        overlap: 200
      }
    });
  };

  return (
    <div className="space-y-8 ">

      {/* Agent Creation Form */}
      <Card className="glassmorphic border-neon-blue/20">
        <CardHeader>
          <CardTitle className="holographic-text">Agent Configuration</CardTitle>
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
                <TabsTrigger value="knowledge" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Knowledge Base
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-bold holographic-text">
                      Agent Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., MindWell, CogniTutor"
                      className="bg-black/20 focus:ring-neon-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-lg font-bold holographic-text">
                      Role/Category
                    </Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g., Therapist, Tutor, Assistant"
                      className="bg-black/20 focus:ring-neon-blue"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-bold holographic-text">
                    Description *
                  </Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="A brief description of what your agent does"
                    className="bg-black/20 focus:ring-neon-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemPrompt" className="text-lg font-bold holographic-text">
                    System Prompt *
                  </Label>
                  <Textarea
                    id="systemPrompt"
                    value={formData.systemPrompt}
                    onChange={(e) => setFormData(prev => ({ ...prev, systemPrompt: e.target.value }))}
                    placeholder="You are a helpful assistant that..."
                    rows={6}
                    className="bg-black/20 focus:ring-neon-blue"
                  />
                  <p className="text-sm text-muted-foreground">
                    This defines your agent's personality and behavior. Be specific about tone, expertise, and interaction style.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="knowledge" className="mt-6">
                <KnowledgeBaseManager
                  documents={formData.knowledgeBase}
                  onDocumentsChange={(documents) => setFormData(prev => ({ ...prev, knowledgeBase: documents }))}
                  config={formData.knowledgeConfig}
                  onConfigChange={(config) => setFormData(prev => ({ ...prev, knowledgeConfig: config }))}
                />
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-lg font-bold holographic-text">Icon</Label>
                    <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
                      <SelectTrigger className="bg-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <option.icon className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg font-bold holographic-text">Theme Color</Label>
                    <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
                      <SelectTrigger className="bg-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${option.preview}`} />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature" className="text-lg font-bold holographic-text">
                      Creativity (0-1)
                    </Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formData.temperature}
                      onChange={(e) => setFormData(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 0.7 }))}
                      className="bg-black/20 focus:ring-neon-blue"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricing" className="text-lg font-bold holographic-text">
                      Price (ICP)
                    </Label>
                    <Input
                      id="pricing"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.pricing}
                      onChange={(e) => setFormData(prev => ({ ...prev, pricing: parseFloat(e.target.value) || 0 }))}
                      className="bg-black/20 focus:ring-neon-blue"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              type="submit"
              size="lg"
              className="w-full font-bold bg-neon-purple/80 hover:bg-neon-purple text-white"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Deploy Agent to NeuroVerse
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Template Selection */}
      <Card className="glassmorphic border-neon-purple/20">
        <CardHeader>
          <CardTitle className="holographic-text">Quick Start Templates</CardTitle>
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
                  <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis line-clamp-3">
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
