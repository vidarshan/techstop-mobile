import {configureStore} from '@reduxjs/toolkit';
import {ProductSlice} from './slices/productSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {UserSlice} from './slices/userSlice';
import {CartSlice} from './slices/cartSlice';
import {OrderSlice} from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    products: ProductSlice.reducer,
    cart: CartSlice.reducer,
    order: OrderSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
