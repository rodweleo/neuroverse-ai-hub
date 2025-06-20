
interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  favoriteAgents: string[];
  followingUsers: string[];
  followers: string[];
  createdAgents: string[];
  joinedAt: Date;
  stats: {
    totalInteractions: number;
    agentsCreated: number;
    reputation: number;
  };
}

interface UserPreferences {
  favoriteCategories: string[];
  notifications: {
    agentUpdates: boolean;
    newFollowers: boolean;
    marketplaceUpdates: boolean;
  };
  privacy: {
    showStats: boolean;
    showFavorites: boolean;
    allowMessages: boolean;
  };
}

class UserService {
  private currentUser: UserProfile | null = null;
  private users: Map<string, UserProfile> = new Map();

  constructor() {
    this.loadUserData();
  }

  private loadUserData() {
    const stored = localStorage.getItem('neuroberse_user_data');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.users = new Map(Object.entries(data.users || {}));
        if (data.currentUser) {
          this.currentUser = {
            ...data.currentUser,
            joinedAt: new Date(data.currentUser.joinedAt)
          };
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    }
  }

  private saveUserData() {
    const data = {
      currentUser: this.currentUser,
      users: Object.fromEntries(this.users.entries())
    };
    localStorage.setItem('neuroberse_user_data', JSON.stringify(data));
  }

  createUser(username: string, email: string): UserProfile {
    const user: UserProfile = {
      id: this.generateId(),
      username,
      email,
      favoriteAgents: [],
      followingUsers: [],
      followers: [],
      createdAgents: [],
      joinedAt: new Date(),
      stats: {
        totalInteractions: 0,
        agentsCreated: 0,
        reputation: 0
      }
    };

    this.users.set(user.id, user);
    this.currentUser = user;
    this.saveUserData();
    return user;
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  updateUserProfile(updates: Partial<UserProfile>): void {
    if (!this.currentUser) return;
    
    this.currentUser = { ...this.currentUser, ...updates };
    this.users.set(this.currentUser.id, this.currentUser);
    this.saveUserData();
  }

  toggleFavoriteAgent(agentId: string): boolean {
    if (!this.currentUser) return false;

    const favorites = this.currentUser.favoriteAgents;
    const index = favorites.indexOf(agentId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(agentId);
    }

    this.saveUserData();
    return index === -1; // Returns true if added, false if removed
  }

  isFavoriteAgent(agentId: string): boolean {
    return this.currentUser?.favoriteAgents.includes(agentId) || false;
  }

  getFavoriteAgents(): string[] {
    return this.currentUser?.favoriteAgents || [];
  }

  followUser(userId: string): boolean {
    if (!this.currentUser || userId === this.currentUser.id) return false;

    const following = this.currentUser.followingUsers;
    const index = following.indexOf(userId);
    
    if (index > -1) {
      following.splice(index, 1);
      // Remove from other user's followers
      const otherUser = this.users.get(userId);
      if (otherUser) {
        const followerIndex = otherUser.followers.indexOf(this.currentUser.id);
        if (followerIndex > -1) {
          otherUser.followers.splice(followerIndex, 1);
        }
      }
    } else {
      following.push(userId);
      // Add to other user's followers
      const otherUser = this.users.get(userId);
      if (otherUser) {
        otherUser.followers.push(this.currentUser.id);
      }
    }

    this.saveUserData();
    return index === -1; // Returns true if followed, false if unfollowed
  }

  isFollowing(userId: string): boolean {
    return this.currentUser?.followingUsers.includes(userId) || false;
  }

  getUserStats(): any {
    return this.currentUser?.stats || {
      totalInteractions: 0,
      agentsCreated: 0,
      reputation: 0
    };
  }

  incrementInteraction(): void {
    if (!this.currentUser) return;
    this.currentUser.stats.totalInteractions++;
    this.saveUserData();
  }

  addCreatedAgent(agentId: string): void {
    if (!this.currentUser) return;
    this.currentUser.createdAgents.push(agentId);
    this.currentUser.stats.agentsCreated++;
    this.saveUserData();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

export const userService = new UserService();
export type { UserProfile, UserPreferences };
