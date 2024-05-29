import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers';
import { save, load } from "redux-localstorage-simple";

const isClient = typeof window !== 'undefined';

const preloadedState = isClient ? load() : {};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => isClient ? getDefaultMiddleware().concat(save()) : getDefaultMiddleware(),
});

export default store;
