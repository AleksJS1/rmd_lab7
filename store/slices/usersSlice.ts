import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CheckoutUser = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

const initialState: CheckoutUser = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCheckoutField(
      state,
      action: PayloadAction<{ field: keyof CheckoutUser; value: string }>,
    ) {
      state[action.payload.field] = action.payload.value;
    },
    setCheckoutInfo(state, action: PayloadAction<CheckoutUser>) {
      return action.payload;
    },
    clearCheckoutInfo() {
      return initialState;
    },
  },
});

export const { setCheckoutField, setCheckoutInfo, clearCheckoutInfo } = usersSlice.actions;

export const selectCheckoutUser = (state: { users: CheckoutUser }) => state.users;

export default usersSlice.reducer;
