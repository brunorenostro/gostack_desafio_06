import { Router, request } from 'express';


import CreateTransactionService from '../services/CreateTransactionService';
import { getCustomRepository, TransactionRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionsRouter.get('/', async (request, response) => {


  const balance = await transactionsRepository.getBalance();
  const transactionsList = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsList.find();

  return response.json({
    transactions: transactions,
    balance: balance
  });

});

transactionsRouter.post('/', async (request, response) => {
  // ROTA QUE CRIA A TRANSACTION

  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category
  });

  return response.json(transaction);

});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
