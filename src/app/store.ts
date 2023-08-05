import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonReducer from 'features/common/model';

export const rootReducer = combineReducers({
  common: commonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
