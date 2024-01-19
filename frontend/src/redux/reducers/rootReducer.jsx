import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './productSlice'


const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
