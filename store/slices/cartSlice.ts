import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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
  'cart/getItemsFromStorage',
  async () => {
    if (getPlatform() === 'web') {
      const jsonValue = await AsyncStorage.getItem('cart');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } else {
      const jsonValue = await AsyncStorage.getItem('@cart');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
  },
);

export const removeItemFromStorage = createAsyncThunk(
  'cart/removeItemFromStorage',
  async (id: string) => {
    if (getPlatform() === 'web') {
      const cartItems = localStorage.getItem('cart');
      const mutableCartItems = cartItems != null ? JSON.parse(cartItems) : [];
      const cartItemsWithoutItem = mutableCartItems.filter(item => {
        return item.product !== id;
      });
      await localStorage.setItem('cart', JSON.stringify(cartItemsWithoutItem));
      return cartItemsWithoutItem;
    } else {
      const cartItems = await AsyncStorage.getItem('@cart');
      const mutableCartItems = cartItems != null ? JSON.parse(cartItems) : [];
      const cartItemsWithoutItem = mutableCartItems.filter(item => {
        return item.product !== id;
      });
      await AsyncStorage.setItem('cart', JSON.stringify(cartItemsWithoutItem));
      return cartItemsWithoutItem;
    }
  },
);

export const setItemsToStorage = createAsyncThunk(
  'cart/setItemsToStorage',
  async (cartObj: CartItem) => {
    if (getPlatform() === 'web') {
      const currentItems = await localStorage.getItem('cart');
      const mutableCurrentObj =
        currentItems != null ? JSON.parse(currentItems) : [];
      mutableCurrentObj.push(cartObj);
      await localStorage.setItem('cart', JSON.stringify(mutableCurrentObj));
      return cartObj;
    } else {
      const currentItems = await AsyncStorage.getItem('@cart');
      const mutableCurrentObj =
        currentItems != null ? JSON.parse(currentItems) : [];
      mutableCurrentObj.push(cartObj);
      await AsyncStorage.setItem('cart', JSON.stringify(mutableCurrentObj));
      return cartObj;
    }
  },
);

export const clearCartFromStorage = createAsyncThunk(
  'cart/clearCartFromStorage',
  async () => {
    if (getPlatform() === 'web') {
      localStorage.removeItem('cart');
    } else {
      AsyncStorage.removeItem('cart');
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
    builder.addCase(removeItemFromStorage.fulfilled, (state, action) => {
      state.cart = action.payload;
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
    builder.addCase(
      setItemsToStorage.fulfilled,
      (state, action: PayloadAction<any>) => {
        const mutableCart = state.cart;
        mutableCart.push(action?.payload);
        state.cart = mutableCart;
        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(setItemsToStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(setItemsToStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(clearCartFromStorage.fulfilled, state => {
      state.cart = [];
      state.loading = false;
      state.error = false;
    });
    builder.addCase(clearCartFromStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(clearCartFromStorage.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const {} = CartSlice.actions;
export default CartSlice.reducer;
