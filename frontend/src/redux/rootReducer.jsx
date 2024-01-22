import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlices/productSlice'
import productDetailReducer from './slices/productSlices/productDetailSlice';
import productReviewCreateReducer from './slices/productSlices/productReviewCreateSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
  productReview: productReviewCreateReducer
});

export default rootReducer;
