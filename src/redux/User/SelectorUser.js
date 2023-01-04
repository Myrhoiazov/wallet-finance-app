const getUserEmail = state => state.user.email;
const getUserId = state => state.user.id;
const getIsLoading = state => state.user.isLoading;
const getError = state => state.user.error;

const userSelectors = {
    getUserEmail,
    getUserId,
    getIsLoading,
    getError,
};

export default userSelectors;