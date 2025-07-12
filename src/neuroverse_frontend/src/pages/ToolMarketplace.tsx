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
import ToolCardEditorChoice from "@/components/tools/ToolCardEditorChoice";
import { DeveloperPortal } from "@/components/DeveloperPortal";

const ToolMarketplace = () => {
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

  const featuredTools = [
    {
      id: "weather-api",
      name: "Weather Oracle",
      description:
        "Real-time weather data from OpenWeather API with location detection",
      creator: "0xWeatherDev",
      category: "api",
      type: "premium",
      price: 0.5,
      currency: "ckBTC",
      rating: 4.8,
      users: 1245,
      verified: true,
      cycleCost: "2.1B",
      version: "2.1.0",
      icon: "🌦️",
      tags: ["weather", "location", "real-time"],
      openSource: false,
    },
    {
      id: "pdf-reader",
      name: "PDF Intelligence",
      description:
        "Extract and analyze content from PDF documents with OCR capabilities",
      creator: "0xDocProcessor",
      category: "data",
      type: "free",
      price: 0,
      currency: null,
      rating: 4.6,
      users: 2891,
      verified: true,
      cycleCost: "1.5B",
      version: "1.8.2",
      icon: "📄",
      tags: ["pdf", "ocr", "document"],
      openSource: true,
    },
    {
      id: "web-scraper",
      name: "Web Data Harvester",
      description:
        "Intelligent web scraping with anti-bot detection and rate limiting",
      creator: "0xScrapeMaster",
      category: "api",
      type: "premium",
      price: 1.2,
      currency: "ckBTC",
      rating: 4.9,
      users: 856,
      verified: true,
      cycleCost: "3.8B",
      version: "3.0.1",
      icon: "🕷️",
      tags: ["scraping", "web", "data"],
      openSource: false,
    },
    {
      id: "crypto-oracle",
      name: "Blockchain Analyzer",
      description:
        "Real-time crypto prices, wallet analysis, and DeFi protocol data",
      creator: "0xCryptoOracle",
      category: "api",
      type: "token-gated",
      price: 2.0,
      currency: "ckBTC",
      rating: 4.7,
      users: 634,
      verified: true,
      cycleCost: "4.2B",
      version: "1.5.0",
      icon: "₿",
      tags: ["crypto", "defi", "blockchain"],
      openSource: false,
    },
    {
      id: "translator",
      name: "Universal Translator",
      description: "Support for 100+ languages with context-aware translations",
      creator: "0xLinguist",
      category: "utility",
      type: "free",
      price: 0,
      currency: null,
      rating: 4.5,
      users: 3421,
      verified: true,
      cycleCost: "0.8B",
      version: "2.3.1",
      icon: "🌐",
      tags: ["translation", "language", "i18n"],
      openSource: true,
    },
    {
      id: "zapier-bridge",
      name: "Zapier Connect",
      description:
        "Integrate with 5000+ apps through Zapier webhooks and automation",
      creator: "0xAutomation",
      category: "communication",
      type: "premium",
      price: 0.8,
      currency: "ckBTC",
      rating: 4.4,
      users: 1789,
      verified: true,
      cycleCost: "2.5B",
      version: "1.9.0",
      icon: "⚡",
      tags: ["automation", "webhooks", "integration"],
      openSource: false,
    },
  ];

  const filteredTools = featuredTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalTools: 247,
    activeDevelopers: 89,
    totalIntegrations: 12456,
    avgRating: 4.6,
  };

  return (
    <main className="container py-8 space-y-4">
      <header className="space-y-4 flex items-end justify-between h-60 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 p-6 rounded-lg shadow-lg">
        <div className="space-y-2 w-full max-w-2xl">
          <h1 className="text-6xl font-orbitron font-bold holographic-text py-2">
            Tools App Store
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

          {/* Featured Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Editor's Choice</h2>
              <Button variant="outline">View All Featured</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.slice(0, 3).map((tool) => (
                <ToolCardEditorChoice tool={tool} onSelect={setSelectedTool} />
              ))}
            </div>
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
