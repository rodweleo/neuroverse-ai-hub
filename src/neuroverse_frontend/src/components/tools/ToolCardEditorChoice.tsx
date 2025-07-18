import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tool } from "@/utils/types";

type ToolCardEditorChoiceProps = {
  tool: Tool;
  onSelectTool: (tool: Tool) => void;
};
const ToolCardEditorChoice = ({
  tool,
  onSelectTool,
}: ToolCardEditorChoiceProps) => {
  const handleSelectTool = (tool: Tool) => {
    onSelectTool(tool);
  };
  return (
    <Card
      key={tool.id}
      className="group hover:shadow-lg transition-all duration-300 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{tool.icon}</div>
            <div>
              <CardTitle className="text-lg text-gray-800">
                {tool.name}
              </CardTitle>
              <p className="text-sm text-gray-500">by {tool.creator}</p>
            </div>
          </div>
          <Badge className="bg-yellow-500 text-white">Featured</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 text-gray-600">
          {tool.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="w-full">
        <div className="w-full flex items-center justify-end">
          <Button
            size="sm"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            onClick={() => handleSelectTool(tool)}
          >
            Integrate
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ToolCardEditorChoice;
