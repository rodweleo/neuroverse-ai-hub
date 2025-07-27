import {
  Zap,
  Workflow,
  Calculator,
  Cloud,
  FileText,
  Globe,
  Search,
  Code,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ToolCard from "@/components/tools/ToolCard";

import { DeveloperPortal } from "@/components/DeveloperPortal";
import { useAllTools } from "@/hooks/use-all-tools";

const ToolMarketplace = () => {
  const { data, isFetching } = useAllTools();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState(null);
  const [showDeveloperPortal, setShowDeveloperPortal] = useState(false);

  const categories = [
    { id: "all", name: "All Tools", icon: Globe },
    { id: "api", name: "APIs", icon: Cloud },
    { id: "utility", name: "Utilities", icon: Calculator },
    { id: "data", name: "Data Processing", icon: FileText },
    { id: "communication", name: "Communication", icon: Zap },
  ];

  const filteredTools = data
    ? data.filter((tool) => {
        const matchesSearch =
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || tool.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  return (
    <main className="container py-8 space-y-4">
      <header className="space-y-4 flex items-end justify-between h-60 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 p-6 rounded-lg shadow-lg">
        <div className="space-y-2 w-full max-w-2xl">
          <h1 className="text-6xl font-orbitron font-bold holographic-text py-2">
            Tool Store
          </h1>
          <p className="text-md text-muted-foreground">
            Discover, integrate, and monetize AI tools that supercharge your
            agents. From APIs to utilities, build the perfect AI toolkit for any
            use case.
          </p>
        </div>
        <Button
          className="bg-neon-purple/80 hover:bg-neon-purple"
          asChild
          onClick={() => setShowDeveloperPortal(true)}
        >
          <Link to="#">
            <Workflow className="mr-2 h-4 w-4" />
            Launch your own tool
          </Link>
        </Button>
      </header>
      <div>
        <div className="py-8">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search tools, categories, or creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-white shadow-sm"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-0">
                {/* Filter Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    <Shield className="mr-1 h-3 w-3" />
                    Verified Only
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-green-50"
                  >
                    💚 Free Tools
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-yellow-50"
                  >
                    ⭐ Highly Rated
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50"
                  >
                    🔥 Trending
                  </Badge>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onSelect={setSelectedTool}
                    />
                  ))}
                </div>

                {filteredTools.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No tools found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Tool Integration Modal
        {selectedTool && (
          <ToolIntegrationModal
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
          />
        )} */}

        {/* Developer Portal Modal */}
        {showDeveloperPortal && (
          <DeveloperPortal onClose={() => setShowDeveloperPortal(false)} />
        )}
      </div>
    </main>
  );
};

export default ToolMarketplace;
