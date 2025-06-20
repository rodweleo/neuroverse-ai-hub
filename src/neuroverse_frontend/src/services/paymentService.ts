
interface PaymentTransaction {
  id: string;
  agentId: string;
  userId: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

class PaymentService {
  private transactions: PaymentTransaction[] = [];

  async processPayment(agentId: string, userId: string, amount: number): Promise<PaymentTransaction> {
    const transaction: PaymentTransaction = {
      id: this.generateId(),
      agentId,
      userId,
      amount,
      timestamp: new Date(),
      status: 'pending'
    };

    // Simulate payment processing
    // In a real app, this would integrate with ICP ledger
    setTimeout(() => {
      transaction.status = Math.random() > 0.1 ? 'completed' : 'failed';
      this.transactions.push(transaction);
    }, 1000);

    return transaction;
  }

  getTransactionHistory(userId?: string): PaymentTransaction[] {
    if (userId) {
      return this.transactions.filter(tx => tx.userId === userId);
    }
    return this.transactions;
  }

  getTotalEarnings(agentId: string): number {
    return this.transactions
      .filter(tx => tx.agentId === agentId && tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

export const paymentService = new PaymentService();
export type { PaymentTransaction };
