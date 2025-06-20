
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  agentId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

class ChatService {
  private conversations: Map<string, Conversation> = new Map();

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
        id: convId,
        agentId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }

    // Add user message
    const userMessage: Message = {
      id: this.generateId(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    conversation.messages.push(userMessage);

    // Simulate AI response (in real app, this would call your AI service)
    const aiResponse = await this.generateAIResponse(agentId, conversation.messages);
    
    const assistantMessage: Message = {
      id: this.generateId(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    };
    conversation.messages.push(assistantMessage);

    conversation.updatedAt = new Date();
    this.conversations.set(convId, conversation);

    return { response: aiResponse, conversationId: convId };
  }

  private async generateAIResponse(agentId: string, messages: Message[]): Promise<string> {
    // In a real implementation, this would call OpenAI, Claude, or run on ICP
    // For now, we'll simulate based on agent personality
    
    const agent = this.getAgentById(agentId);
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    
    // Simple response generation based on agent type
    if (agent?.role === 'Therapist') {
      return `I understand you're sharing "${lastUserMessage}" with me. How does that make you feel? Let's explore this together.`;
    } else if (agent?.role === 'Tutor') {
      return `Great question about "${lastUserMessage}"! Let me break this down for you in simple terms...`;
    } else {
      return `Thank you for your message about "${lastUserMessage}". I'm here to help you with whatever you need.`;
    }
  }

  private getAgentById(agentId: string) {
    // This would normally fetch from your agent database
    const agents = [
      { id: 'therapist-bot', role: 'Therapist' },
      { id: 'tutor-bot', role: 'Tutor' },
      { id: 'generic-bot', role: 'General Assistant' }
    ];
    return agents.find(agent => agent.id === agentId);
  }

  getConversation(conversationId: string): Conversation | undefined {
    return this.conversations.get(conversationId);
  }

  getUserConversations(userId?: string): Conversation[] {
    // In real app, filter by userId
    return Array.from(this.conversations.values());
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

export const chatService = new ChatService();
export type { Message, Conversation };
