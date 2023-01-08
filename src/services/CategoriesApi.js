import { privateAPI } from './http';

const getCategories = async () => {
  const { data } = await privateAPI.get('/categories');
  return data;
};

export const categoriesAPI = {
  getCategories,
};
