import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPlatform} from '../../utils/Platform';

export interface CartItem {
  product: string;
  image: string;
  name: string;
  price: number;
}

interface CartState {
  cart: CartItem[];
  error: boolean;
  loading: boolean;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: false,
};

export const getItemsFromStorage = createAsyncThunk(
  'user/getUserFromStorage',
  async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    console.log('jsonValue', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },
);

export const removeItemFromStorage = createAsyncThunk(
  'user/removeUserFromAsyncStorage',
  async () => {
    if (getPlatform() === 'web') {
      await localStorage.removeItem('user');
    } else {
      await AsyncStorage.removeItem('@user');
    }
  },
);

export const setItemsToStorage = createAsyncThunk(
  'user/setUserToLocalStorage',
  async (cartObj: CartItem) => {
    if (getPlatform() === 'web') {
      const currentItems = await localStorage.getItem('cart');
      console.log('🚀 ~ file: cartSlice.ts:52 ~ currentItems:', currentItems);
      const mutableCurrentObj =
        currentItems != null ? JSON.parse(currentItems) : [];
      mutableCurrentObj.push(cartObj);

      await localStorage.setItem('cart', JSON.stringify(mutableCurrentObj));
      return mutableCurrentObj;
    }
  },
);

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getItemsFromStorage.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getItemsFromStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getItemsFromStorage.rejected, state => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(removeItemFromStorage.fulfilled, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeItemFromStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeItemFromStorage.rejected, state => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(setItemsToStorage.fulfilled, (state, action) => {
      state.cart = action.payload.mutableCurrentObj;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(setItemsToStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(setItemsToStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
  },
});
export const {} = CartSlice.actions;
export default CartSlice.reducer;
