import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderProduct = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  lineTotal: number;
};

export type OrderRecord = {
  id: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderProduct[];
  total: number;
};

type OrdersState = {
  items: OrderRecord[];
};

const initialState: OrdersState = {
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<OrderRecord>) {
      state.items.unshift(action.payload);
    },
    clearOrders(state) {
      state.items = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) => state.orders.items;

export default ordersSlice.reducer;
