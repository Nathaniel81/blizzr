import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlices/productSlice'
import productDetailReducer from './slices/productSlices/productDetailSlice';
import productReviewCreateReducer from './slices/productSlices/productReviewCreateSlice';
import userLoginInfoReducer from './slices/userSlices/userInfoSlice';
import addToCartReducer from './slices/cartSlices/addToCartSlice';
import orderCreateReducer from './slices/orderSlices/orderCreateSlice';
import orderDetailReducer from './slices/orderSlices/orderDetailSlice';
import orderPayReducer from './slices/orderSlices/orderPaySlice';
import userDetailReducer from './slices/userSlices/userDetailsSlice';
import userUpdateReducer from './slices/userSlices/userUpdateSlice';
import orderUserListReducer from './slices/orderSlices/orderUserListSlice';
import userRegisterReducer from './slices/userSlices/userRegisterSlice';
import orderDeliverReducer from './slices/orderSlices/orderDeliverSlice';
import userListReducer from './slices/userSlices/userListSlice';
import userDeleteReducer from './slices/userSlices/userDeleteSlice';
import userUpdateAdminReducer from './slices/userSlices/userUpdateAdminSlice';
import productDeleteReducer from './slices/productSlices/productDeleteSlice';
import productUpdateReducer from './slices/productSlices/productUpdateSlice';
import productCreateReducer from './slices/productSlices/productCreateSlice';
import orderListReducer from './slices/orderSlices/orderListSlice';


const rootReducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
  productReview: productReviewCreateReducer,
  userInfo: userLoginInfoReducer,
  cart: addToCartReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
  userOrders: orderUserListReducer,
  userRegister: userRegisterReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  orderList: orderListReducer
});

export default rootReducer;
