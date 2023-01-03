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
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/AuthSlice';
import authErrorLogger from './Auth/MiddlewareAuth';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
      auth: persistReducer(persistConfig, authReducer),
  },
  middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [
                  FLUSH,
                  REHYDRATE,
                  PAUSE,
                  PERSIST,
                  PURGE,
                  REGISTER,
              ],
          },
      }).concat(authErrorLogger);
  },
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);