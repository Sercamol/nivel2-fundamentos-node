import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllTransactions {
    const balance = this.getBalance();

    const response = { transactions: this.transactions, balance };

    return response;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(row => row.type == 'income');
    const totalIncome = income.reduce(
      (val, currentval) => val + currentval.value,
      0,
    );

    const outcome = this.transactions.filter(row => row.type == 'outcome');
    const totalOutcome = outcome.reduce(
      (val, currentval) => val + currentval.value,
      0,
    );
    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
