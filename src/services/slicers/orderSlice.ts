import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '../../utils/types';
import { fetchOrderBurger, fetchOrderByNumber } from '../thunks/orderThunk';
import { isActionPending, isActionRejected } from '../../utils/redux';

type TOrderBurger = {
  order: TOrder | null;
  status: RequestStatus;
  orderRequest: boolean;
  orderByNumber: TOrder | null;
};

export const initialState: TOrderBurger = {
  order: null,
  status: RequestStatus.Idle,
  orderRequest: false,
  orderByNumber: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal: (state) => {
      (state.order = null), (state.orderRequest = false);
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderRequest: (state) => state.orderRequest,
    getOrderByNumber: (state) => state.orderByNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        console.log('Action payload:', action.payload);
        state.orderByNumber = action.payload.orders[0];
      })
      .addMatcher(isActionPending(orderSlice.name), (state) => {
        state.status = RequestStatus.Loading;
      })
      .addMatcher(isActionRejected(orderSlice.name), (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export default orderSlice.reducer;

export const { closeModal } = orderSlice.actions;

export const { getOrderRequest, getOrder, getOrderByNumber } =
  orderSlice.selectors;
