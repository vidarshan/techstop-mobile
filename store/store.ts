import {configureStore} from '@reduxjs/toolkit';
import {ProductSlice} from './slices/productSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {UserSlice} from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    products: ProductSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
