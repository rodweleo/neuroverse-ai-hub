
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import DocumentUpload, { KnowledgeDocument } from './DocumentUpload';
import { Brain, Settings, FileText } from 'lucide-react';

export interface KnowledgeConfig {
  maxContextLength: number;
  searchSensitivity: number;
  citationsEnabled: boolean;
  chunkSize: number;
  overlap: number;
}

interface KnowledgeBaseManagerProps {
  documents: KnowledgeDocument[];
  onDocumentsChange: (documents: KnowledgeDocument[]) => void;
  config: KnowledgeConfig;
  onConfigChange: (config: KnowledgeConfig) => void;
}

const KnowledgeBaseManager = ({
  documents,
  onDocumentsChange,
  config,
  onConfigChange
}: KnowledgeBaseManagerProps) => {
  const updateConfig = (updates: Partial<KnowledgeConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const getTotalSize = () => {
    return documents.reduce((total, doc) => total + doc.size, 0);
  };

  const getTotalChunks = () => {
    return documents.reduce((total, doc) => total + doc.chunks.length, 0);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card className="glassmorphic border-neon-blue/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-neon-blue" />
            <CardTitle>Knowledge Base</CardTitle>
          </div>
          <CardDescription>
            Upload documents to enhance your agent's knowledge and capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glassmorphic">
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              <DocumentUpload
                documents={documents}
                onDocumentsChange={onDocumentsChange}
              />

              {documents.length > 0 && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-background/20 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neon-blue">{documents.length}</p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neon-purple">{getTotalChunks()}</p>
                    <p className="text-sm text-muted-foreground">Chunks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-acid-green">{formatFileSize(getTotalSize())}</p>
                    <p className="text-sm text-muted-foreground">Total Size</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Max Context Length</Label>
                  <Input
                    type="number"
                    value={config.maxContextLength}
                    onChange={(e) => updateConfig({ maxContextLength: parseInt(e.target.value) || 4000 })}
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of characters to include from knowledge base in each response
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Search Sensitivity: {config.searchSensitivity}
                  </Label>
                  <Slider
                    value={[config.searchSensitivity]}
                    onValueChange={(value) => updateConfig({ searchSensitivity: value[0] })}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    How closely user queries must match document content (0 = loose, 1 = exact)
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Chunk Size: {config.chunkSize} characters
                  </Label>
                  <Slider
                    value={[config.chunkSize]}
                    onValueChange={(value) => updateConfig({ chunkSize: value[0] })}
                    max={2000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Size of text chunks for processing and search
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Chunk Overlap: {config.overlap} characters
                  </Label>
                  <Slider
                    value={[config.overlap]}
                    onValueChange={(value) => updateConfig({ overlap: value[0] })}
                    max={500}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Overlap between consecutive chunks to maintain context
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Enable Citations</Label>
                    <p className="text-xs text-muted-foreground">
                      Include source document references in agent responses
                    </p>
                  </div>
                  <Switch
                    checked={config.citationsEnabled}
                    onCheckedChange={(checked) => updateConfig({ citationsEnabled: checked })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBaseManager;
