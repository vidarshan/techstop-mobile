import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPlatform} from '../../utils/Platform';

export interface OrderDetails {
  phone: string;
  email: string;
  house: string;
  line: string;
  city: string;
  country: string;
  code: string;
  payment: string;
}

interface CartState {
  orderDetails: OrderDetails | null;
  error: boolean;
  loading: boolean;
}

const initialState: CartState = {
  orderDetails: null,
  loading: false,
  error: false,
};

export const getInfoFromStorage = createAsyncThunk(
  'order/getInfoFromStorage',
  async () => {
    const jsonValue = await AsyncStorage.getItem('order');
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  },
);

export const removeInfoFromStorage = createAsyncThunk(
  'order/removeInfoFromStorage',
  async () => {
    if (getPlatform() === 'web') {
      await localStorage.removeItem('order');
    }
  },
);

export const setInfoToStorage = createAsyncThunk(
  'order/setInfoToStorage',
  async (orderObj: OrderDetails) => {
    if (getPlatform() === 'web') {
      await localStorage.setItem('order', JSON.stringify(orderObj));
      return orderObj;
    }
  },
);

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getInfoFromStorage.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getInfoFromStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getInfoFromStorage.rejected, state => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(
      setInfoToStorage.fulfilled,
      (state, action: PayloadAction<any>) => {
        const detailsObj: OrderDetails = {
          phone: action.payload.phone,
          email: action.payload.email,
          house: action.payload.house,
          line: action.payload.line,
          city: action.payload.city,
          code: action.payload.code,
          country: action.payload.country,
          payment: action.payload.payment,
        };
        state.orderDetails = detailsObj;
        state.loading = false;
        state.error = false;
      },
    );
    builder.addCase(setInfoToStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(setInfoToStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeInfoFromStorage.fulfilled, state => {
      state.orderDetails = null;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeInfoFromStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeInfoFromStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
  },
});
export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
