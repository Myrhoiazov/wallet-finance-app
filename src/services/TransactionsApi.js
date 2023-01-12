import { privateAPI } from './http';

//(defaults - page:1, limit:5)
const getTransactions = async (page = 1, limit = 5) => {
  const { data } = await privateAPI.get(
    `/transactions?page=${page}&limit=${limit}`
  );
  return data;
};

const getTransactionsTimes = async () => {
  const { data } = await privateAPI.get('/transactions/dates');
  return data;
};

const getTransactionsByDate = async (month, year) => {
  const { data } = await privateAPI.get(`/transactions/${month}/${year}`);
  return data;
};

const postTransactions = async transaction => {
  const { data } = await privateAPI.post('/transactions', transaction);
  return data;
};

export const transactionsAPI = {
  getTransactions,
  getTransactionsTimes,
  getTransactionsByDate,
  postTransactions,
};
