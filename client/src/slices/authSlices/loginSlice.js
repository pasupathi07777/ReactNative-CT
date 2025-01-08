import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {validateFields} from '../../utils/validationFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from '../../utils/tokenFunction';
import { axiosInstance } from '../../utils/axios';
import { Alert } from 'react-native';



export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const error = validateFields(credentials);
      if (error) {
        return rejectWithValue({error});
      }
      const response = await axiosInstance.post(`/auth/login`, credentials);
      if (response.data.user) {
        await AsyncStorage.setItem('Token', response.data.user.token);
        const token = await AsyncStorage.getItem('Token');
        console.log(`Token: ${token}`);
      }
      return response.data;
    } catch (err) {
      const error = err.response?.data ||
        err.response || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

export const getUserAuth = createAsyncThunk(
  'auth/token',
  async (_, {rejectWithValue}) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue({message: 'No token found'});
      const response = await axiosInstance.post(`/auth/checkToken`, {token});
      return response.data;
    } catch (err) {
      const error = err.response?.data || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      await AsyncStorage.removeItem('authToken');
      return {};
    } catch (err) {
      return rejectWithValue({message: 'Error during logout'});
    }
  },
);

const initialState = {
  loginLoading: false,
  currentUser: {},
  loginStatus: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        Alert.alert('',  'Login successful.');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
         Alert.alert('', action.payload.error.message || 'Something went wrong');
      })

      .addCase(getUserAuth.pending, state => {
        state.loginLoading = true;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        console.log(state.currentUser, 'state.currentUser');
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload, 'action.payload'); 
      })

      .addCase(logout.fulfilled, state => {
        state.currentUser = {};
        state.loginStatus = false;
        state.loginForm = initialState.loginForm;
      });
  },
});

export const {} = loginSlice.actions;
export const loginState = state => state.loginReducer;
export default loginSlice.reducer;
