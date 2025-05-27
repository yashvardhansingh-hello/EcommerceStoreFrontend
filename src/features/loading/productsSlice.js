import { createSlice } from "@reduxjs/toolkit";

// const getUserFromLocalStorage = () => {
//   return localStorage.getItem("products");
// };

const initialState = {
  product: [],
  pageCount: 1,
  productsCount: 0,
  isLoading: false
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
    addProducts: (state, action) => {
      state.product = action.payload.products;
      state.pageCount = action.payload.pageCount;
      state.productsCount = action.payload.productsCount;
      // localStorage.setItem("products", JSON.stringify(action.payload));
    },

    removeProducts: (state, action) => {
      state.product = [];
      state.pageCount = 1;
      state.productsCount = 0;
      // localStorage.removeItem("products");
    },

    setLoading: (state, action) => {
       state.isLoading = true;
    },
    
    setNotLoading: (state, action) => {
      state.isLoading = false;
    }

  },
});

export const { addProducts, removeProducts, setLoading, setNotLoading } = productSlice.actions;

export default productSlice.reducer;
