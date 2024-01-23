import { createSlice } from '@reduxjs/toolkit';

const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState: {
    loading: false,
    cartItems: localStorage.getItem('cartItems') ?
    [JSON.parse(localStorage.getItem('cartItems'))] : [],
    // shippingAddress: {},
    paymentMethod: null,
    error: null,
  },
  reducers: {
    cartAddItemStart: (state) => {
      state.loading = true;
    },
    cartAddItemSuccess: (state, action) => {
      state.loading = false;
      const newItem = action.payload;

      const existItemIndex = state.cartItems.findIndex(x => x.product === newItem.product);

      if (existItemIndex !== -1) {
        state.cartItems[existItemIndex] = newItem;
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }
      state.error = null;
    },
    cartAddItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    cartRemoveItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product !== productIdToRemove);
    },
    cartSaveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    cartSavePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    cartClearItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  cartAddItemStart,
  cartAddItemSuccess,
  cartAddItemFailure,
  cartRemoveItem,
  cartSaveShippingAddress,
  cartSavePaymentMethod,
  cartClearItems,
} = addToCartSlice.actions;
export default addToCartSlice.reducer;
