import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { authReducer } from './auth/slice';
import { contactsReducer } from './contacts/slice';
import { filtersReducer } from './filters/slice';

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching action:', action);
  console.log('Current state:', store.getState());
  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER',
          'auth/register',
          'auth/login',
          'auth/logout',
          'auth/refresh',
        ],
        ignoredPaths: [
          'register',
          'rehydrate',
          'auth.register',
          'auth.login',
          'auth.logout',
          'auth.refresh',
        ],
      },
    }).concat(loggerMiddleware),
});

export const persistor = persistStore(store);