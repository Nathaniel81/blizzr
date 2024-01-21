import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlices/productSlice'
import productDetailReducer from './slices/productSlices/productDetailSlice';


const rootReducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
});

export default rootReducer;
