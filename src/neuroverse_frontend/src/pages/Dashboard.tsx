
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, DollarSign, Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/use-auth-client"
import useUserAgents from '@/hooks/useUserAgents';

const Dashboard = () => {
  const { principal } = useAuth()
  const { data: userAgents } = useUserAgents(principal)


  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-end h-60 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-6xl font-orbitron font-bold holographic-text">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your AI agents and track their performance
          </p>
        </div>
        <Button className="bg-neon-purple/80 hover:bg-neon-purple" asChild>
          <Link to="/deploy">
            <Plus className="mr-2 h-4 w-4" />
            Create New Agent
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphic border-neon-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Brain className="h-4 w-4 text-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userAgents?.length}</div>
            <p className="text-xs text-muted-foreground">
              Active AI agents
            </p>
          </CardContent>
        </Card>

        <Card className="glassmorphic border-neon-purple/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <Users className="h-4 w-4 text-neon-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              User conversations
            </p>
          </CardContent>
        </Card>

        <Card className="glassmorphic border-acid-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-acid-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{0} ICP</div>
            <p className="text-xs text-muted-foreground">
              Revenue generated
            </p>
          </CardContent>
        </Card>

        <Card className="glassmorphic border-neon-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-neon-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              Most interactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed View */}
      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList className="glassmorphic">
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="analytics">Live Analytics</TabsTrigger>
          <TabsTrigger value="earnings">Revenue Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <Card className="glassmorphic border-neon-blue/20">
            <CardHeader>
              <CardTitle>Agent Performance Metrics</CardTitle>
              <CardDescription>
                Real-time performance data for your AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* {agentUsages.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Interactions</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Earnings (ICP)</TableHead>
                      <TableHead>Last Used</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agentUsages.map((usage) => (
                      <TableRow key={usage.agentId}>
                        <TableCell className="font-medium">
                          {getAgentName(usage.agentId)}
                        </TableCell>
                        <TableCell>{usage.interactions}</TableCell>
                        <TableCell>{usage.totalMessages}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{usage.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground text-sm">
                              ({usage.ratingCount})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{usage.earnings.toFixed(2)}</TableCell>
                        <TableCell>{usage.lastUsed.toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
               
              )} */}

              <div className="text-center py-12 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No agent interactions yet. Start chatting with agents to see analytics!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glassmorphic border-neon-purple/20">
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Agent interaction patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* {agentUsages.map((usage) => (
                    <div key={usage.agentId} className="flex items-center justify-between">
                      <span className="font-medium">{getAgentName(usage.agentId)}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-neon-purple h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, (usage.interactions / Math.max(...agentUsages.map(u => u.interactions), 1)) * 100)}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{usage.interactions}</span>
                      </div>
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphic border-acid-green/20">
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Earnings breakdown by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* {agentUsages.map((usage) => (
                    <div key={usage.agentId} className="flex items-center justify-between">
                      <span className="font-medium">{getAgentName(usage.agentId)}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-acid-green h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, (usage.earnings / Math.max(...agentUsages.map(u => u.earnings), 1)) * 100)}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold">{usage.earnings.toFixed(1)} ICP</span>
                      </div>
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card className="glassmorphic border-acid-green/20">
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Detailed breakdown of your earnings and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-acid-green/10 rounded-lg">
                  <div className="text-2xl font-bold text-acid-green">
                    {0} ICP
                  </div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </div>
                <div className="text-center p-4 bg-neon-blue/10 rounded-lg">
                  <div className="text-2xl font-bold text-neon-blue">
                    {0} ICP
                  </div>
                  <div className="text-sm text-muted-foreground">Avg per Agent</div>
                </div>
                <div className="text-center p-4 bg-neon-purple/10 rounded-lg">
                  <div className="text-2xl font-bold text-neon-purple">
                    0.10 ICP
                  </div>
                  <div className="text-sm text-muted-foreground">Per Interaction</div>
                </div>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Payment history and detailed revenue reports coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
