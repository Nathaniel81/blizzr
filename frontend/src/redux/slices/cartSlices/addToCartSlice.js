import { createSlice } from '@reduxjs/toolkit';

const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState: {
    loading: false,
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : null,
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : null,
    orderValues: null,
    error: null,
  },
  reducers: {
    cartAddItemStart: (state) => {
      state.loading = true;
    },
    cartAddItemSuccess: (state, action) => {
      state.loading = false;
      const newItem = action.payload;

      const existItemIndex = state.cartItems.findIndex(
        (x) => x.product === newItem.product
      );

      if (existItemIndex !== -1) {
        state.cartItems = state.cartItems.map((item, index) =>
          index === existItemIndex ? newItem : item
        );
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
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== productIdToRemove
      );
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
    saveOrderValues: (state) => {
      if (state.cartItems.length !== 0) {
        const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
        const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
        const taxPrice = Number((0.082) * itemsPrice).toFixed(2)
        const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
        const subtotal = state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
        state.orderValues = {
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          subtotal
        }
      } else {
        state.orderValues = null;
      }
    },
    clearOrderValues: (state) => {
      state.orderValues = null;
    }
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
  saveOrderValues,
  clearOrderValues
} = addToCartSlice.actions;
export default addToCartSlice.reducer;
