import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPlatform} from '../../utils/Platform';
import axios from 'axios';

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

export interface OrderAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderAddress {
  email: string;
  name: string;
  _id: string;
}

export interface OrderSummary {
  shippingAddress: OrderAddress | any;
  _id: string;
  user: OrderAddress | any;
  orderItems: any[];
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderContent {
  orderItems: any;
  shippingAddress: any;
  paymentMethod: string;
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
}

interface OrderState {
  orderDetails: OrderDetails;
  orderContent: OrderContent | null;
  error: boolean;
  loading: boolean;
  orderLoading: boolean;
  orderError: boolean;
  orderSuccess: boolean;
  orderId: string;
  orderSummary: OrderSummary | null;
  orderSummaryLoading: boolean;
  orderSummaryError: boolean;
  myOrders: any[];
  myOrdersLoading: boolean;
  myOrdersError: boolean;
}

const initialState: OrderState = {
  orderDetails: {
    phone: '',
    email: '',
    house: '',
    line: '',
    city: '',
    country: '',
    code: '',
    payment: '',
  },
  orderContent: null,
  loading: false,
  error: false,
  orderLoading: false,
  orderError: false,
  orderSuccess: false,
  orderId: '',
  orderSummary: {
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    _id: '',
    user: {
      _id: '',
      name: '',
      email: '',
    },
    orderItems: [],
    paymentMethod: '',
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    isPaid: false,
    isDelivered: false,
    createdAt: '',
    updatedAt: '',
  },
  orderSummaryLoading: false,
  orderSummaryError: false,
  myOrders: [],
  myOrdersLoading: false,
  myOrdersError: false,
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

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderObj: OrderContent) => {
    const tokenFromStorage = localStorage.getItem('user');
    let jsonTokenFromStorage;
    if (tokenFromStorage !== null) {
      jsonTokenFromStorage = JSON.parse(tokenFromStorage);
    } else {
      jsonTokenFromStorage = '';
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jsonTokenFromStorage.token}`,
      },
    };
    const response = await axios.post(
      'https://tech-stop.onrender.com/api/v1/orders',
      orderObj,
      config,
    );
    return response.data;
  },
);

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (id: string) => {
    const tokenFromStorage = localStorage.getItem('user');
    let jsonTokenFromStorage;
    if (tokenFromStorage !== null) {
      jsonTokenFromStorage = JSON.parse(tokenFromStorage);
    } else {
      jsonTokenFromStorage = '';
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jsonTokenFromStorage.token}`,
      },
    };
    const response = await axios.get(
      `https://tech-stop.onrender.com/api/v1/orders/${id}`,
      config,
    );
    return response.data;
  },
);

export const getMyOrders = createAsyncThunk('order/getMyOrders', async () => {
  const tokenFromStorage = localStorage.getItem('user');
  let jsonTokenFromStorage;
  if (tokenFromStorage !== null) {
    jsonTokenFromStorage = JSON.parse(tokenFromStorage);
  } else {
    jsonTokenFromStorage = '';
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jsonTokenFromStorage.token}`,
    },
  };
  const response = await axios.get(
    'https://tech-stop.onrender.com/api/v1/orders/myorders',
    config,
  );
  return response.data;
});

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    setOrderSuccess: (
      state: OrderState,
      action: PayloadAction<{set: boolean; id: string}>,
    ) => {
      state.orderSuccess = action.payload.set;
      state.orderId = action.payload.id;
    },
  },
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
      state.orderDetails = {
        phone: '',
        email: '',
        house: '',
        line: '',
        city: '',
        country: '',
        code: '',
        payment: '',
      };
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
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orderSummary = action.payload;
      state.orderSummaryLoading = false;
      state.orderSummaryError = false;
    });
    builder.addCase(getOrder.pending, state => {
      state.orderSummaryLoading = true;
      state.orderSummaryError = false;
    });
    builder.addCase(getOrder.rejected, state => {
      state.orderSummaryLoading = false;
      state.orderSummaryError = true;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orderId = action.payload._id;
      state.orderSuccess = true;
      state.orderLoading = false;
      state.orderError = false;
    });
    builder.addCase(placeOrder.pending, state => {
      state.orderLoading = true;
      state.orderError = false;
    });
    builder.addCase(placeOrder.rejected, state => {
      state.orderLoading = false;
      state.orderError = false;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.myOrders = action.payload;
      state.myOrdersLoading = false;
      state.myOrdersError = false;
    });
    builder.addCase(getMyOrders.pending, state => {
      state.myOrdersLoading = true;
      state.myOrdersError = false;
    });
    builder.addCase(getMyOrders.rejected, state => {
      state.myOrdersLoading = false;
      state.myOrdersError = true;
    });
  },
});
export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
