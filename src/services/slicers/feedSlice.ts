import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { fetchFeed } from '../thunks/feedThunk';
import { isActionPending, isActionRejected } from '../../utils/redux';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addMatcher(isActionPending(feedSlice.name), (state) => {
        state.status = RequestStatus.Loading;
      })
      .addMatcher(isActionRejected(feedSlice.name), (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export default feedSlice.reducer;

export const { getFeed, getTotal, getTotalToday } = feedSlice.selectors;
