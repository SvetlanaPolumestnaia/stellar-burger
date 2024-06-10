import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser, RequestStatus } from '@utils-types';
import {
  fetchLogin,
  fetchProfileOrders,
  fetchRegister,
  logout
} from '../thunks/userThunk';
import { isActionPending, isActionRejected } from '../../utils/redux';

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  status: RequestStatus;
  userOrders: TOrder[];
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  status: RequestStatus.Idle,
  userOrders: []
};

const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state: TUserState) => state.user,
    getUserOrders: (state) => state.userOrders,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(isActionPending(sliceUser.name), (state) => {
        state.status = RequestStatus.Loading;
      })
      .addMatcher(isActionRejected(sliceUser.name), (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export default sliceUser.reducer;

export const { getUser, getUserOrders, getIsAuthChecked } = sliceUser.selectors;

export const { setUser, setIsAuthChecked } = sliceUser.actions;
