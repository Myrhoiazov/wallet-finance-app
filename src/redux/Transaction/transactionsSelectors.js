export const selectTransactions = state =>
  state.transactions.items.transactions;
export const selectTotalTransactions = state => state.transactions.items.total;
export const selectIsLoading = state => state.transactions.isLoading;
export const selectError = state => state.transactions.error;
