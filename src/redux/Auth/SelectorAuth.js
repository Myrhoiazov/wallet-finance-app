const getToken = state => state.auth.token;
const getIsLoading = state => state.auth.isLoading;
const getError = state => state.auth.error;

const authSelectors = {
  getToken,
  getIsLoading,
  getError,
};

export default authSelectors;