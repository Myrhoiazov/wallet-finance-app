import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/AuthSlice';
import userReducer from './User/UserSlice';
import authErrorLogger from './Auth/MiddlewareAuth';
import transactionsReducer from './Transaction/transactionsSlice';
import categoriesReducer from './Categories/categoriesSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  user: userReducer,
  transactions: transactionsReducer,
  categories: categoriesReducer,
});

const rootPersistConfig = {
  key: 'root',
  storage,
};

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: rootPersistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authErrorLogger);
  },
  devTools: process.env.NODE_ENV === 'development',
});

// export const store = configureStore({
//   reducer: {
//     auth: persistReducer(persistConfig, authReducer),
//     user: userReducer,
//     transactions: transactionsReducer,
//     categories: categoriesReducer,
//   },
//   middleware(getDefaultMiddleware) {
//     return getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(authErrorLogger);
//   },
//   devTools: process.env.NODE_ENV === 'development',
// });
export const persistor = persistStore(store);
