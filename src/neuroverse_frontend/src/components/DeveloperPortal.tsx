import React, { useState } from "react";
import {
  X,
  Upload,
  Code,
  Globe,
  DollarSign,
  Shield,
  FileText,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { SUPPORTED_CURRENCIES } from "@/utils/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToolSubmissionForm from "./tools/ToolSubmissionForm";

interface DeveloperPortalProps {
  onClose: () => void;
}

export const DeveloperPortal: React.FC<DeveloperPortalProps> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("submit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    type: "free",
    price: 0,
    currency: "BTC",
    sourceUrl: "",
    version: "1.0.0",
    tags: "",
    openSource: false,
    acceptTerms: false,
  });

  const { toast } = useToast();

  const categories = [
    { value: "api", label: "External APIs" },
    { value: "utility", label: "Utilities" },
    { value: "data", label: "Data Processing" },
    { value: "communication", label: "Communication" },
    { value: "security", label: "Security" },
    { value: "blockchain", label: "Blockchain" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast({
        title: "Terms Required",
        description:
          "Please accept the terms and conditions to submit your tool.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Tool Submitted Successfully!",
      description:
        "Your tool is now under review. We'll notify you within 2-3 business days.",
    });

    setIsSubmitting(false);
    onClose();
  };

  const myTools = [
    {
      id: "weather-tool-v2",
      name: "Advanced Weather API",
      status: "approved",
      users: 234,
      revenue: 45.6,
      version: "2.1.0",
      submittedDate: "2024-01-15",
    },
    {
      id: "crypto-analyzer",
      name: "Crypto Market Analyzer",
      status: "pending",
      users: 0,
      revenue: 0,
      version: "1.0.0",
      submittedDate: "2024-01-20",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                Developer Portal
              </DialogTitle>
              <p className="text-gray-500">
                Build and monetize tools for the AI ecosystem
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="submit">Submit Tool</TabsTrigger>
              <TabsTrigger value="my-tools">My Tools</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="submit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tool Submission Form</CardTitle>
                    <CardDescription>
                      Submit your tool to the marketplace and start earning from
                      integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ToolSubmissionForm />
                    <form onSubmit={handleSubmit} className="space-y-6 hidden">
                      <div>
                        <Label htmlFor="name">Tool Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Weather Oracle"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe what your tool does and how it helps AI agents..."
                          className="min-h-[100px]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              setFormData({ ...formData, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="type">Tool Type *</Label>
                          <Select
                            value={formData.type}
                            onValueChange={(value) =>
                              setFormData({ ...formData, type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                              <SelectItem value="token-gated">
                                Token-Gated
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {formData.type !== "free" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price *</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={formData.price}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  price: parseFloat(e.target.value),
                                })
                              }
                              placeholder="0.00"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="currency">Currency *</Label>
                            <Select
                              value={formData.currency}
                              onValueChange={(value) =>
                                setFormData({ ...formData, currency: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SUPPORTED_CURRENCIES.map((currency) => (
                                  <SelectItem value={currency.symbol}>
                                    <div className="flex items-center gap-2">
                                      <Avatar className="size-6">
                                        <AvatarImage
                                          src={currency.logo}
                                          alt={currency.name}
                                        />
                                        <AvatarFallback>
                                          {currency.symbol}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span>{currency.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="sourceUrl">Source Code URL</Label>
                        <Input
                          id="sourceUrl"
                          value={formData.sourceUrl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              sourceUrl: e.target.value,
                            })
                          }
                          placeholder="https://github.com/yourname/tool-repo"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                          placeholder="weather, api, real-time"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="openSource"
                            checked={formData.openSource}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                openSource: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="openSource">
                            This is an open-source tool
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="acceptTerms"
                            checked={formData.acceptTerms}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                acceptTerms: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="acceptTerms">
                            I accept the{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              Developer Agreement
                            </a>
                          </Label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Upload className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Submit Tool
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="my-tools" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Your Submitted Tools
                  </h3>
                  <Badge variant="secondary">{myTools.length} tools</Badge>
                </div>

                {myTools.map((tool) => (
                  <Card key={tool.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">
                              {tool.name}
                            </h4>
                            <Badge className={getStatusColor(tool.status)}>
                              {tool.status === "approved" && (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              )}
                              {tool.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            Version {tool.version} • Submitted{" "}
                            {tool.submittedDate}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Users</div>
                              <div className="font-semibold">
                                {tool.users.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                Revenue
                              </div>
                              <div className="font-semibold">
                                ${tool.revenue}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                Status
                              </div>
                              <div className="font-semibold capitalize">
                                {tool.status}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="guidelines" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Submission Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Quality Standards</h4>
                      <ul className="text-sm space-y-1 text-gray-400">
                        <li>
                          • Tools must be well-documented with clear usage
                          instructions
                        </li>
                        <li>• Code should follow security best practices</li>
                        <li>• Tools must handle errors gracefully</li>
                        <li>
                          • Performance requirements: &lt; 5s response time for
                          most operations
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Pricing Guidelines</h4>
                      <ul className="text-sm space-y-1 text-gray-400">
                        <li>• Platform takes 15% commission on paid tools</li>
                        <li>
                          • Recommend pricing between $0.10 - $10.00 for most
                          tools
                        </li>
                        <li>• Consider cycle costs when setting prices</li>
                        <li>• Free tools help build reputation</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Review Process</h4>
                      <ul className="text-sm space-y-1 text-gray-400">
                        <li>• Initial review within 2-3 business days</li>
                        <li>
                          • Security audit for tools accessing external APIs
                        </li>
                        <li>• Performance testing on test agents</li>
                        <li>• Community feedback period for complex tools</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
