import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://connections-api.goit.global';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users/signup`, credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      console.error('Register error:', {
        url: `${API_BASE_URL}/users/signup`,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users/login`, credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', {
        url: `${API_BASE_URL}/users/login`,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post(`${API_BASE_URL}/users/logout`);
    clearAuthHeader();
  } catch (error) {
    console.error('Logout error:', {
      url: `${API_BASE_URL}/users/logout`,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    console.log('Attempting to refresh user with token:', token);
    if (!token) {
      console.warn('No token found in state.auth.token');
      return thunkAPI.rejectWithValue('No token');
    }
    setAuthHeader(token);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/users/current`);
      console.log('Refresh user successful:', data);
      return data;
    } catch (error) {
      console.error('Refresh user error:', {
        url: `${API_BASE_URL}/users/current`,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        tokenUsed: token,
      });
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);