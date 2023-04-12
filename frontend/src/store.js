import { configureStore,combineReducers } from '@reduxjs/toolkit';
import  storage  from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

import contactReducer from './slices/contactSlice';

const persistConfig = {
  key:"something secret",
  version:1,
  storage:storage
}

const reducer = combineReducers({
  contacts:contactReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer
})