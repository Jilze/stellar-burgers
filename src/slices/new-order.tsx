import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const placeNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  loading: false,
  order: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => {
      Object.assign(state, initialState);
    }
  },
  selectors: {
    getOrderLoad: (state) => state.loading,
    getOrderData: (state) => state.order
  },
  extraReducers: ({ addCase }) => {
    addCase(placeNewOrder.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    addCase(placeNewOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.order = payload.order;
    });
    addCase(placeNewOrder.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { getOrderLoad, getOrderData } = newOrderSlice.selectors;

export default newOrderSlice;
