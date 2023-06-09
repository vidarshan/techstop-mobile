import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPlatform} from '../../utils/Platform';

export interface User {
  _id: any;
  name: string;
  email?: string;
  token?: string | null;
}

interface AuthState {
  user: User;
  loading: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  loginError: boolean;
  registerError: boolean;
  error: boolean;
}

const initialState: AuthState = {
  user: {
    _id: '',
    name: '',
    email: '',
    token: null,
  },
  loginLoading: false,
  registerLoading: false,
  loginError: false,
  registerError: false,
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

  if (response.data.token !== null) {
    if (getPlatform() === 'web') {
      await localStorage.setItem('user', JSON.stringify(response.data));
    } else {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
  }
  return response.data;
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: any) => {
    const response = await axios.post(
      'https://tech-stop.onrender.com/api/v1/users',
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    );
    return response.data;
  },
);

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
    if (getPlatform() === 'web') {
      await localStorage.removeItem('user');
    } else {
      await AsyncStorage.removeItem('@user');
    }
  },
);

export const getUserFromAsyncStorage = createAsyncThunk(
  'user/getUserFromStorage',
  async () => {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },
);

export const setUserToLocalStorage = createAsyncThunk(
  'user/setUserToLocalStorage',
  async (userObj: any) => {
    if (getPlatform() === 'web') {
      const jsonValue = JSON.stringify(userObj);
      await localStorage.setItem('user', jsonValue);
    } else {
      const jsonValue = JSON.stringify(userObj);
      await AsyncStorage.setItem('user', jsonValue);
    }
  },
);

export const removeUserFromLocalStorage = createAsyncThunk(
  'user/removeUserFromLocalStorage',
  async () => {
    if (getPlatform() === 'web') {
      await localStorage.removeItem('user');
    } else {
      await AsyncStorage.removeItem('@user');
    }
  },
);

export const getUserFromLocalStorage = createAsyncThunk(
  'user/getUserFromLocalStorage',
  async () => {
    if (getPlatform() === 'web') {
      const jsonValue = await localStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } else {
      const jsonValue = await AsyncStorage.getItem('@user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
  },
);

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    resetErrors(state) {
      state.error = false;
      state.loginError = false;
      state.registerError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.user._id = action.payload._id;
      state.user.token = action.payload.token;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.loginLoading = false;
      state.loginError = false;
    });
    builder.addCase(authUser.pending, state => {
      state.loginLoading = true;
      state.loginError = false;
    });
    builder.addCase(authUser.rejected, state => {
      state.loginLoading = false;
      state.loginError = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user._id = action.payload._id;
      state.user.token = action.payload.token;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.registerLoading = false;
      state.registerError = false;
    });
    builder.addCase(registerUser.pending, state => {
      state.registerLoading = true;
      state.registerError = false;
    });
    builder.addCase(registerUser.rejected, state => {
      state.registerLoading = false;
      state.registerError = true;
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
      if (action.payload === null) {
        state.loading = true;
      } else {
        state.user._id = action.payload._id;
        state.user.token = action.payload.token;
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.loading = false;
        state.error = false;
      }
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
    builder.addCase(setUserToLocalStorage.fulfilled, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(setUserToLocalStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(setUserToLocalStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getUserFromLocalStorage.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.loading = true;
      } else {
        state.user._id = action.payload._id;
        state.user.token = action.payload.token;
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.loading = false;
        state.error = false;
      }
    });
    builder.addCase(getUserFromLocalStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUserFromLocalStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeUserFromLocalStorage.fulfilled, state => {
      state.user._id = '';
      state.user.token = null;
      state.user.email = '';
      state.user.name = '';
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeUserFromLocalStorage.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeUserFromLocalStorage.rejected, state => {
      state.loading = false;
      state.error = false;
    });
  },
});
export const {resetErrors} = UserSlice.actions;
export default UserSlice.reducer;
