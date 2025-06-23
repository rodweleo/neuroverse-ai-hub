
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Trash2, Search, Brain, FileText, Calendar, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AgentEditForm from './AgentEditForm';
import { KnowledgeDocument } from './DocumentUpload';
import { KnowledgeConfig } from './KnowledgeBaseManager';
import useUserAgents from '@/hooks/useUserAgents';
import { useAuth } from '@/contexts/use-auth-client';
import { Agent } from '../../../../declarations/neuroverse_backend/neuroverse_backend.did';

const AgentManagementDashboard = () => {
  const { toast } = useToast();
  const { principal } = useAuth()
  const { data: userAgents } = useUserAgents(principal)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const filteredAgents = userAgents ? userAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const deleteAgent = (agentId: string) => {
    toast({
      title: "Agent Deleted",
      description: `The agent ${agentId} has been successfully removed.`,
    });
  };

  const handleAgentUpdate = (updatedAgent: Agent) => {

    setEditDialogOpen(false);
    setSelectedAgent(null);

    toast({
      title: "Agent Updated",
      description: `${updatedAgent.name} has been successfully updated.`,
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end h-60 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-6xl font-orbitron font-bold holographic-text py-2">
            My Agents
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage and edit your deployed AI agents
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-background/50"
            />
          </div>
          <Badge variant="outline" className="text-neon-blue">
            {userAgents ? userAgents.length : 0} agent{filteredAgents?.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {filteredAgents?.length === 0 ? (
        <Card className="glassmorphic border-neon-blue/20">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No agents found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery ? 'No agents match your search criteria.' : 'You haven\'t created any agents yet.'}
            </p>
            {!searchQuery && (
              <Button onClick={() => window.location.href = '/deploy'}>
                Create Your First Agent
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="glassmorphic border-neon-blue/20 hover:border-neon-purple/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-background/50`}>
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {agent.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {agent.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span className="text-muted-foreground">Knowledge:</span>
                    </div>
                    <span className="font-medium text-neon-blue">

                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-muted-foreground">Modified:</span>
                    </div>
                    <span className="font-medium">
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    v
                  </span>

                  <div className="flex items-center gap-1">

                    <Dialog open={editDialogOpen && selectedAgent?.id === agent.id} onOpenChange={setEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedAgent(agent)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Agent: {agent.name}</DialogTitle>
                          <DialogDescription>
                            Update your agent's configuration and knowledge base
                          </DialogDescription>
                        </DialogHeader>
                        {selectedAgent && (
                          <AgentEditForm
                            agent={selectedAgent}
                            onSave={handleAgentUpdate}
                            onCancel={() => {
                              setEditDialogOpen(false);
                              setSelectedAgent(null);
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAgent(agent.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentManagementDashboard;
