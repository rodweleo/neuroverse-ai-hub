
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Filter } from "lucide-react";
import useAllAgents from "@/hooks/useAllAgents"
import EnhancedAgentCard from './EnhancedAgentCard';
import AgentTemplates from './AgentTemplates';
import AgentSearch from './AgentSearch';

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Alphabetical' },
];

const AgentDiscovery = () => {
  const { data: agents } = useAllAgents()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedAgents = useMemo(() => {
    let filtered = agents?.filter(agent => {
      const matchesSearch = !searchQuery ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag =>
          agent.category.toLowerCase().includes(tag.toLowerCase()) ||
          agent.description.toLowerCase().includes(tag.toLowerCase())
        );

      return matchesSearch && matchesTags;
    });

    return filtered;
  }, [searchQuery, selectedTags, sortBy, agents]);

  return (
    <Tabs defaultValue="agents" className="space-y-6">
      <TabsList className="glassmorphic">
        <TabsTrigger value="agents">Browse Agents</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="agents" className="space-y-6">
        {/* Enhanced Search and Filters */}
        <div className="glassmorphic p-6 rounded-lg border border-neon-blue/20">
          <AgentSearch
            searchQuery={searchQuery}
            selectedTags={selectedTags}
            onSearch={setSearchQuery}
            onTagFilter={setSelectedTags}
          />

          {/* Additional Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mt-6 pt-6 border-t border-neon-blue/20">
            <div className="flex gap-3 items-center w-full lg:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[150px] bg-background/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Summary */}
            <p className="text-muted-foreground text-sm">
              Found {filteredAndSortedAgents ? filteredAndSortedAgents.length : 0} agent{filteredAndSortedAgents?.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Agent Grid/List */}
        {filteredAndSortedAgents?.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedAgents.map((agent) => (
              <EnhancedAgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glassmorphic rounded-lg">
            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No agents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="templates">
        <AgentTemplates />
      </TabsContent>
    </Tabs>
  );
};

export default AgentDiscovery;
