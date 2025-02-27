import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, { payload }) => {
      // şuan eklenen elemandan sepette aynı tipte olan var mı ?
      const existingItem = state.cart.find(
        (item) =>
          item.id === payload.item.id &&
          item.selectedType === payload.selectedType
      );

      if (existingItem) {
        //eğer sepette varsa miktar arttır
        existingItem.quantity += 1;
      } else {
        // eğer sepette yoksa sepete elemanı ekle
        state.cart.push({
          ...payload.item,
          selectedType: payload.selectedType,
          quantity: 1,
        });
      }
    },

    createOrder: (state) => {
      state.cart = [];
    },

    deleteFromCart: (state, { payload }) => {
      // aynı id ve aynı tipteki elemanı sepette bul
      const existingItem = state.cart.find(
        (item) =>
          item.id === payload.id && item.selectedType === payload.selectedType
      );

      if (existingItem.quantity > 1) {
        // miktarı 1'den fazlaysa miktarını azalt
        existingItem.quantity--;
      } else {
        //miktarı 1 ise ürünü sil
        const index = state.cart.findIndex(
          (item) =>
            item.id === payload.id && item.selectedType === payload.selectedType
        );

        state.cart.splice(index, 1);
      }
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, createOrder, deleteFromCart } = cartSlice.actions;
