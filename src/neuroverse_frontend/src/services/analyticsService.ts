
interface AgentUsage {
  agentId: string;
  interactions: number;
  totalMessages: number;
  earnings: number;
  lastUsed: Date;
  rating: number;
  ratingCount: number;
}

interface UserStats {
  totalAgents: number;
  totalInteractions: number;
  totalEarnings: number;
  topAgent: string;
}

class AnalyticsService {
  private usage: Map<string, AgentUsage> = new Map();

  trackInteraction(agentId: string, messageCount: number = 1) {
    const current = this.usage.get(agentId) || {
      agentId,
      interactions: 0,
      totalMessages: 0,
      earnings: 0,
      lastUsed: new Date(),
      rating: 0,
      ratingCount: 0
    };

    current.interactions += 1;
    current.totalMessages += messageCount;
    current.earnings += 0.1; // 0.1 ICP per interaction
    current.lastUsed = new Date();

    this.usage.set(agentId, current);
  }

  rateAgent(agentId: string, rating: number) {
    const current = this.usage.get(agentId);
    if (current) {
      const totalRating = (current.rating * current.ratingCount) + rating;
      current.ratingCount += 1;
      current.rating = totalRating / current.ratingCount;
      this.usage.set(agentId, current);
    }
  }

  getAgentStats(agentId: string): AgentUsage | undefined {
    return this.usage.get(agentId);
  }

  getUserStats(): UserStats {
    const allUsage = Array.from(this.usage.values());
    
    return {
      totalAgents: allUsage.length,
      totalInteractions: allUsage.reduce((sum, usage) => sum + usage.interactions, 0),
      totalEarnings: allUsage.reduce((sum, usage) => sum + usage.earnings, 0),
      topAgent: allUsage.sort((a, b) => b.interactions - a.interactions)[0]?.agentId || ''
    };
  }

  getAllAgentUsage(): AgentUsage[] {
    return Array.from(this.usage.values());
  }
}

export const analyticsService = new AnalyticsService();
export type { AgentUsage, UserStats };
