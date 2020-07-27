// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';


interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {

    const transactionRepository = getCustomRepository(TransactionRepository);

    const categoryRepository = getRepository(Category);
    const categoriesExist = await categoryRepository.findOne({ where: { title: category } });
    if (!categoriesExist) {
      const categoryCreate = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryCreate);
    }



    //verificar se a categoria existe ou não, se não  criar uma nova se sim pegar o id e inserir no category_id
    const categories = await categoryRepository.findOne({ where: { title: category } });
    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categories?.id
    });

    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
