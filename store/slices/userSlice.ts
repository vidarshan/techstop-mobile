import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  _id: any;
  name: string;
  email?: string;
  token?: string | null;
}

interface AuthState {
  user: User;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  user: {
    _id: '',
    name: '',
    email: '',
    token: null,
  },
  loading: false,
  error: false,
};

export const authUser = createAsyncThunk('user/login', async (data: any) => {
  const response = await axios.post(
    'https://tech-stop.onrender.com/api/v1/users/login',
    {
      email: data.email,
      password: data.password,
    },
  );
  return response.data;
});

export const setUserToAsyncStorage = createAsyncThunk(
  'user/setUserToAsyncStorage',
  async (userObj: any) => {
    const jsonValue = JSON.stringify(userObj);
    await AsyncStorage.setItem('user', jsonValue);
  },
);

export const removeUserFromAsyncStorage = createAsyncThunk(
  'user/removeUserFromAsyncStorage',
  async () => {
    await AsyncStorage.removeItem('@user');
  },
);

export const getUserFromAsyncStorage = createAsyncThunk(
  'user/getUserFromStorage',
  async () => {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },
);

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.user._id = action.payload._id;
      state.user.token = action.payload.token;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(authUser.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(authUser.rejected, state => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(setUserToAsyncStorage.fulfilled, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(setUserToAsyncStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(setUserToAsyncStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getUserFromAsyncStorage.fulfilled, (state, action) => {
      state.user._id = action.payload._id;
      state.user.token = action.payload.token;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getUserFromAsyncStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUserFromAsyncStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeUserFromAsyncStorage.fulfilled, state => {
      state.user._id = '';
      state.user.token = null;
      state.user.email = '';
      state.user.name = '';
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeUserFromAsyncStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeUserFromAsyncStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
  },
});
export default UserSlice.reducer;
