
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ApiKeySettings from "@/components/settings/ApiKeySettings";
import { conversationService } from "@/services/conversationService";
import { analyticsService } from "@/services/analyticsService";

const Settings = () => {
  const { toast } = useToast();

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This will delete all conversations and analytics data.')) {
      conversationService.clearAllConversations();
      // Clear analytics data
      localStorage.removeItem('neuroberse_analytics');
      toast({
        title: "Data Cleared",
        description: "All conversations and analytics data have been cleared.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-orbitron font-bold holographic-text mb-4">
          Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Configure your NeuroVerse experience and AI integrations
        </p>
      </div>

      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList className="glassmorphic">
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="space-y-4">
          <ApiKeySettings />
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          <Card className="glassmorphic border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Trash2 className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Manage your stored conversations and analytics data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <h3 className="font-semibold text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This action will permanently delete all your conversation history and analytics data.
                  This cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  onClick={handleClearAllData}
                  className="bg-red-500/80 hover:bg-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card className="glassmorphic border-neon-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-neon-purple" />
                User Preferences
              </CardTitle>
              <CardDescription>
                Customize your NeuroVerse experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <SettingsIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Additional preferences coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
