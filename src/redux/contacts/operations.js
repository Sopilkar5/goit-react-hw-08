import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://connections-api.goit.global'; 
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      if (!token) {
        return thunkAPI.rejectWithValue('No auth token found');
      }
      const { data } = await axios.get(`${API_BASE_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error('Fetch contacts error:', {
        url: `${API_BASE_URL}/contacts`,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      const { data } = await axios.post(`${API_BASE_URL}/contacts`, contact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error('Add contact error:', {
        url: `${API_BASE_URL}/contacts`,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      await axios.delete(`${API_BASE_URL}/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return contactId;
    } catch (error) {
      console.error('Delete contact error:', {
        url: `${API_BASE_URL}/contacts/${contactId}`,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;
      const { data } = await axios.patch(
        `${API_BASE_URL}/contacts/${id}`,
        { name, number },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.error('Update contact error:', {
        url: `${API_BASE_URL}/contacts/${id}`,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);