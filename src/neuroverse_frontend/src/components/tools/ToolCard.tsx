import React from "react";
import { Star, Users, Shield, Code, Zap, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Tool {
  id: string;
  name: string;
  description: string;
  creator: string;
  category: string;
  type: "free" | "premium" | "token-gated";
  price: number;
  currency: string | null;
  icon: string;
  tags: string[];
  openSource: boolean;
}

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "free":
        return "bg-green-100 text-green-800 border-green-200";
      case "premium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "token-gated":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "free":
        return "💚";
      case "premium":
        return "💎";
      case "token-gated":
        return "🎫";
      default:
        return "🔧";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{tool.icon}</div>
            <div>
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                {tool.name}
              </CardTitle>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-2">
          by <span className="font-mono text-blue-600">{tool.creator}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2 text-sm">
          {tool.description}
        </CardDescription>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            {tool.type !== "free" ? (
              <div className="flex items-center gap-1 text-lg font-semibold text-blue-600">
                <DollarSign className="h-4 w-4" />
                {tool.price} {tool.currency}
              </div>
            ) : (
              <div className="text-lg font-semibold text-green-600">FREE</div>
            )}
          </div>

          <Button
            size="sm"
            onClick={() => onSelect(tool)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {tool.type === "free" ? "Add Tool" : "Purchase"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
