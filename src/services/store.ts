import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './slicers/burgerContructorSlice';
import ingredientsReducer from './slicers/ingredientSlice';
import orderReducer from './slicers/orderSlice';
import userReducer from './slicers/userSlice';
import feedReducer from './slicers/feedSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
