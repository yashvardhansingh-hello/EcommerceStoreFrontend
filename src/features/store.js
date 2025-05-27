import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';
import productReducer from './loading/productsSlice';
import api from './api';
import rightDrawerReducer from './notification/rightDrawerSlice';
import headerReducer from './adminHeader/headerSlice';

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    productState: productReducer,
    rightDrawer: rightDrawerReducer,
    headerState: headerReducer,
    api: api.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});
