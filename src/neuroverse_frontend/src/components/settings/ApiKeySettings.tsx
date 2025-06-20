
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff, Key, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiService } from '@/services/aiService';
import { conversationService } from '@/services/conversationService';

const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState(aiService.getApiKey() || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [useRealAI, setUseRealAI] = useState(conversationService.getUseRealAI());
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      aiService.setApiKey(apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved securely in your browser.",
      });
    }
  };

  const handleToggleRealAI = (enabled: boolean) => {
    setUseRealAI(enabled);
    conversationService.setUseRealAI(enabled);
    toast({
      title: enabled ? "Real AI Enabled" : "Demo Mode Enabled",
      description: enabled 
        ? "Conversations will now use real OpenAI API responses." 
        : "Conversations will use demo responses.",
    });
  };

  const handleRemoveApiKey = () => {
    setApiKey('');
    aiService.setApiKey('');
    setUseRealAI(false);
    conversationService.setUseRealAI(false);
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed and demo mode is enabled.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glassmorphic border-neon-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-neon-blue" />
            AI Configuration
          </CardTitle>
          <CardDescription>
            Configure AI providers and enable real AI responses for enhanced conversations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Use Real AI Responses</Label>
                <p className="text-xs text-muted-foreground">
                  Enable real AI responses using OpenAI API (requires API key)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Zap className={`h-4 w-4 ${useRealAI ? 'text-acid-green' : 'text-gray-400'}`} />
                <Switch
                  checked={useRealAI}
                  onCheckedChange={handleToggleRealAI}
                  disabled={!apiKey.trim()}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="openai-key" className="text-sm font-medium">
              OpenAI API Key
            </Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="openai-key"
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="bg-black/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                  Save
                </Button>
              </div>
              {apiKey && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRemoveApiKey}
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  Remove API Key
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never sent to our servers.
              Get your API key from{' '}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neon-blue hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
          </div>

          {!useRealAI && (
            <div className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
              <p className="text-sm text-neon-purple">
                <strong>Demo Mode:</strong> Currently using simulated AI responses. 
                Add your OpenAI API key and enable real AI for authentic conversations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeySettings;
