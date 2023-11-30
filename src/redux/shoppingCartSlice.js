import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const entry = state.cart.find((entry) => {
        return entry.item._uid === action.payload._uid;
      });
      if (entry) {
        entry.amount += 1;
      } else {
        state.cart.push({ item: action.payload, amount: 1 });
      }
    },
    increaseAmount: (state, action) => {
      const entry = state.cart.find((entry) => {
        return entry.item._uid === action.payload._uid;
      });
      if (entry) {
        entry.amount += 1;
      } else {
        // this shouldnt ever execute
      }
    },
    decreaseAmount: (state, action) => {
      const entry = state.cart.find((entry) => {
        return entry.item._uid === action.payload._uid;
      });
      if (entry) {
        if (entry.amount === 1) {
          state.cart = state.cart.filter((entry) => {
            return entry.item._uid !== action.payload._uid;
          });
        } else {
          entry.amount -= 1;
        }
      } else {
        // this shouldnt ever execute
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    clearItem: (state, action) => {
      state.cart = state.cart.filter((entry) => {
        return entry.item._uid !== action.payload._uid;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addItem,
  increaseAmount,
  decreaseAmount,
  clearCart,
  clearItem,
  placeOrder,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
