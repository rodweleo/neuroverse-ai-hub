import { aiService, type AgentConfig } from "./aiService";
import { agents } from "@/data/agents";

interface ConversationMemory {
  conversationId: string;
  agentId: string;
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>;
  context: Record<string, any>;
  createdAt: Date;
  lastActive: Date;
}

class ConversationService {
  private conversations: Map<string, ConversationMemory> = new Map();
  private useRealAI: boolean = false;

  constructor() {
    this.loadConversations();
    this.useRealAI = localStorage.getItem("use_real_ai") === "true";
  }

  setUseRealAI(enabled: boolean) {
    this.useRealAI = enabled;
    localStorage.setItem("use_real_ai", enabled.toString());
  }

  getUseRealAI(): boolean {
    return this.useRealAI;
  }

  private loadConversations() {
    const stored = localStorage.getItem("neuroverse_conversations");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([id, conv]: [string, any]) => {
          this.conversations.set(id, {
            ...conv,
            createdAt: new Date(conv.createdAt),
            lastActive: new Date(conv.lastActive),
            messages: conv.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          });
        });
      } catch (error) {
        console.error("Failed to load conversations:", error);
      }
    }
  }

  private saveConversations() {
    const data: Record<string, any> = {};
    this.conversations.forEach((conv, id) => {
      data[id] = conv;
    });
    localStorage.setItem("neuroverse_conversations", JSON.stringify(data));
  }

  async sendMessage(
    agentId: string,
    message: string,
    conversationId?: string
  ): Promise<{ response: string; conversationId: string }> {
    const convId = conversationId || this.generateId();

    // Get or create conversation
    let conversation = this.conversations.get(convId);
    if (!conversation) {
      conversation = {
        conversationId: convId,
        agentId,
        messages: [],
        context: {},
        createdAt: new Date(),
        lastActive: new Date(),
      };
    }

    // Add user message
    const userMessage = {
      id: this.generateId(),
      role: "user" as const,
      content: message,
      timestamp: new Date(),
    };
    conversation.messages.push(userMessage);

    let aiResponse: string;
    try {
      aiResponse = await aiService.generateResponse(agentId, message);
    } catch (error) {
      console.error("AI service error:", error);
      aiResponse = "Something went wrong. Please try again.";
    }

    const assistantMessage = {
      id: this.generateId(),
      role: "assistant" as const,
      content: aiResponse,
      timestamp: new Date(),
    };
    conversation.messages.push(assistantMessage);

    conversation.lastActive = new Date();
    this.conversations.set(convId, conversation);
    this.saveConversations();

    return { response: aiResponse, conversationId: convId };
  }

  getConversation(conversationId: string): ConversationMemory | undefined {
    return this.conversations.get(conversationId);
  }

  getUserConversations(): ConversationMemory[] {
    return Array.from(this.conversations.values()).sort(
      (a, b) => b.lastActive.getTime() - a.lastActive.getTime()
    );
  }

  deleteConversation(conversationId: string) {
    this.conversations.delete(conversationId);
    this.saveConversations();
  }

  clearAllConversations() {
    this.conversations.clear();
    this.saveConversations();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

export const conversationService = new ConversationService();
export type { ConversationMemory };
