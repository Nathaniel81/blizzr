import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlices/productSlice'
import productDetailReducer from './slices/productSlices/productDetailSlice';
import productReviewCreateReducer from './slices/productSlices/productReviewCreateSlice';
import userLoginInfoReducer from './slices/userSlices/userInfoSlice';
import addToCartReducer from './slices/cartSlices/addToCartSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
  productReview: productReviewCreateReducer,
  userInfo: userLoginInfoReducer,
  cart: addToCartReducer
});

export default rootReducer;
