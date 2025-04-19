import { createSlice } from '@reduxjs/toolkit';
    import { addContact, deleteContact, fetchContacts } from './operations';
    import { logout } from '../auth/operations';

    const contactsSlice = createSlice({
      name: 'contacts',
      initialState: { items: [], isLoading: false, error: null },
      extraReducers: builder => {
        builder
          .addCase(fetchContacts.pending, state => {
            state.isLoading = true;
          })
          .addCase(fetchContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
          })
          .addCase(fetchContacts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          })
          .addCase(addContact.fulfilled, (state, action) => {
            state.items.push(action.payload);
          })
          .addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
          })
          .addCase(logout.fulfilled, state => {
            state.items = [];
            state.isLoading = false;
            state.error = null;
          });
      },
    });

    export const contactsReducer = contactsSlice.reducer;