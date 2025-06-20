
interface AIProvider {
  generateResponse(messages: Message[], agentConfig: AgentConfig): Promise<string>;
}

interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  model: string;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

class OpenAIService implements AIProvider {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('openai_api_key');
    }
    return this.apiKey;
  }

  async generateResponse(messages: Message[], agentConfig: AgentConfig): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please add your API key in settings.');
    }

    const systemMessage: Message = {
      role: 'system',
      content: agentConfig.systemPrompt
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: agentConfig.model || 'gpt-4o-mini',
        messages: [systemMessage, ...messages],
        temperature: agentConfig.temperature || 0.7,
        max_tokens: agentConfig.maxTokens || 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  }
}

// Mock AI service for demonstration/fallback
class MockAIService implements AIProvider {
  async generateResponse(messages: Message[], agentConfig: AgentConfig): Promise<string> {
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    
    // Simple response generation based on agent system prompt
    if (agentConfig.systemPrompt.toLowerCase().includes('therapist')) {
      return `I understand you're sharing "${lastUserMessage}" with me. That sounds like it might bring up some complex feelings. Can you tell me more about how you're experiencing this situation?`;
    } else if (agentConfig.systemPrompt.toLowerCase().includes('tutor')) {
      return `Great question about "${lastUserMessage}"! Let me break this down step by step for you. First, let's establish the key concepts...`;
    } else if (agentConfig.systemPrompt.toLowerCase().includes('creative')) {
      return `What an interesting creative challenge! "${lastUserMessage}" opens up so many possibilities. Let's explore some imaginative directions we could take this...`;
    } else {
      return `Thank you for your message about "${lastUserMessage}". I'm here to help you with whatever you need. How can I assist you further?`;
    }
  }
}

export const aiService = new OpenAIService();
export const mockAIService = new MockAIService();
export type { AIProvider, AgentConfig, Message };
