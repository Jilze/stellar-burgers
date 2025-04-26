import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export interface TOrdersState {
  orders: TOrder[];
  loading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  loading: true
};

export const orderCreation = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    listOfOrders: (state) => state.orders
  },
  extraReducers: ({ addCase }) => {
    addCase(getUserOrders.pending, (state) => {
      state.loading = true;
    })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.loading = false;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { listOfOrders } = orderCreation.selectors;
export default orderCreation;
