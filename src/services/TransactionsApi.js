import { privateAPI } from './http';

//(defaults - page:1, limit:5)
const getTransactions = async () => {
  const { data } = await privateAPI.get('/transactions');
  return data;
};

const getUnlimitedTransactions = async () => {
  const { data } = await privateAPI.get('/transactions?pageParam=1&limitTParam=9999');
  return data;
};

const getTransactionsByDate = async date => {
  const { data } = await privateAPI.get(
    `/transactions/${date.month}/${date.year}`
  );
  return data;
};

const postTransactions = async transaction => {
  const { data } = await privateAPI.post('/transactions', transaction);
  return data;
};

export const transactionsAPI = {
  getTransactions,
  getUnlimitedTransactions,
  getTransactionsByDate,
  postTransactions,
};
