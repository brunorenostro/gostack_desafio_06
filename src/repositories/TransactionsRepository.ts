import { EntityRepository, Repository, getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactions = await transactionsRepository.find();
    console.log(transactions);
    console.log(transactions);
    if (typeof transactions !== 'undefined' && transactions.length > 0) {
      const valuesIncome = transactions.map(transaction => transaction.type == 'income' ? Number(transaction.value) : 0);
      const income = valuesIncome.reduce((prevValue, currentValue) => prevValue + currentValue);

      const valuesOutcome = transactions.map(transaction => transaction.type == 'outcome' ? Number(transaction.value) : 0);
      const outcome = valuesOutcome.reduce((prevValue, currentValue) => prevValue + currentValue);

      const total = income - outcome;

      const balance = {
        income,
        outcome,
        total
      };

      return balance;
    }

    const balance = {
      income: 0,
      outcome: 0,
      total: 0
    };

    return balance;

  }
}

export default TransactionsRepository;
