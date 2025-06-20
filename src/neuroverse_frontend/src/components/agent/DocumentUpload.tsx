
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface KnowledgeDocument {
  id: string;
  filename: string;
  type: string;
  size: number;
  uploadDate: Date;
  content: string;
  chunks: string[];
  metadata: Record<string, any>;
}

interface DocumentUploadProps {
  onDocumentsChange: (documents: KnowledgeDocument[]) => void;
  documents: KnowledgeDocument[];
  maxFileSize?: number;
  acceptedTypes?: string[];
}

const DocumentUpload = ({ 
  onDocumentsChange, 
  documents, 
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['.pdf', '.docx', '.txt', '.md', '.json', '.csv']
}: DocumentUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const processFile = async (file: File): Promise<KnowledgeDocument> => {
    const content = await readFileContent(file);
    const chunks = chunkText(content, 1000); // 1000 character chunks
    
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      filename: file.name,
      type: file.type || getFileTypeFromExtension(file.name),
      size: file.size,
      uploadDate: new Date(),
      content,
      chunks,
      metadata: {
        lastModified: file.lastModified,
        extension: file.name.split('.').pop()?.toLowerCase()
      }
    };
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content || '');
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const chunkText = (text: string, chunkSize: number): string[] => {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const getFileTypeFromExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const typeMap: Record<string, string> = {
      'pdf': 'application/pdf',
      'txt': 'text/plain',
      'md': 'text/markdown',
      'json': 'application/json',
      'csv': 'text/csv',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return typeMap[ext || ''] || 'application/octet-stream';
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const newDocuments: KnowledgeDocument[] = [];
      
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        
        if (file.size > maxFileSize) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds the maximum file size of ${Math.round(maxFileSize / 1024 / 1024)}MB`,
            variant: "destructive"
          });
          continue;
        }

        const document = await processFile(file);
        newDocuments.push(document);
        
        setUploadProgress(((i + 1) / acceptedFiles.length) * 100);
      }

      onDocumentsChange([...documents, ...newDocuments]);
      
      toast({
        title: "Documents uploaded",
        description: `Successfully uploaded ${newDocuments.length} document(s)`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your documents",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [documents, maxFileSize, onDocumentsChange, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/json': ['.json'],
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 10
  });

  const removeDocument = (documentId: string) => {
    onDocumentsChange(documents.filter(doc => doc.id !== documentId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-neon-blue bg-neon-blue/10' 
            : 'border-gray-300 hover:border-neon-blue/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-neon-blue">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium mb-2">
              Drag & drop documents here, or click to select
            </p>
            <p className="text-sm text-muted-foreground">
              Supports: {acceptedTypes.join(', ')} (Max {Math.round(maxFileSize / 1024 / 1024)}MB each)
            </p>
          </div>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Uploading...</span>
            <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {documents.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Documents ({documents.length})</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-background/50"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{doc.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(doc.size)} • {doc.chunks.length} chunks
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(doc.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
