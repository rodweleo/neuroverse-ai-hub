
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";

interface AgentSearchProps {
  onSearch: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
  searchQuery: string;
  selectedTags: string[];
}

const popularTags = [
  'AI Assistant', 'Health', 'Education', 'Business', 'Creative', 
  'Technical', 'Support', 'Analysis', 'Writing', 'Productivity'
];

const AgentSearch = ({ onSearch, onTagFilter, searchQuery, selectedTags }: AgentSearchProps) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const handleTagToggle = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagFilter(updatedTags);
  };

  const clearAllFilters = () => {
    onSearch('');
    onTagFilter([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search agents by name, description, or capabilities..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 pr-4 h-12 text-base glassmorphic border-neon-blue/30"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearch('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Tag Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Filter by tags</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(showAllTags ? popularTags : popularTags.slice(0, 6)).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTags.includes(tag) 
                  ? 'bg-neon-blue text-black' 
                  : 'hover:bg-neon-blue/20'
              }`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
              {selectedTags.includes(tag) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
          
          {!showAllTags && popularTags.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTags(true)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              +{popularTags.length - 6} more
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="glassmorphic border border-neon-blue/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Active filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="text-xs">
                Search: "{searchQuery}"
              </Badge>
            )}
            {selectedTags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentSearch;
