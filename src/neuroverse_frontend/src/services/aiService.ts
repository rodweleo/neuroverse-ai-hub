import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";

interface AIProvider {
  generateResponse(agentId: string, message: string): Promise<string>;
}

interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  model: string;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

class AIService implements AIProvider {
  async generateResponse(agentId: string, message: string): Promise<string> {
    try {
      const llmCanisterResponse = await NeuroverseBackendActor.chatWithAgent(
        agentId,
        message
      );
      return llmCanisterResponse;
    } catch (e) {
      console.log(e);
      return "Sorry, I couldn't generate a response.";
    }
  }
}

export const aiService = new AIService();
export type { AIProvider, AgentConfig, Message };
