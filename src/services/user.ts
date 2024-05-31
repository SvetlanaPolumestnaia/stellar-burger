import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi, getUserApi } from '../utils/burger-api';
import { TUser, RequestStatus } from '../utils/types';
import { getCookie } from '../utils/cookie';

export const sliceName = 'user';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder;
    // .addCase(checkUserAuth.fulfilled, (state, action) => {
    //     state.data = action.payload;
    //     state.requestStatus = RequestStatus.Success;
    // })
    // .addCase(registerUserApi.fulfilled, (state, action) => {
    //     state.data = action.payload;
    //     state.requestStatus = RequestStatus.Success;
    // })
    // .addCase(loginUserApi.fulfilled, (state, action) => {
    //     state.data = action.payload;
    //     state.requestStatus = RequestStatus.Success;
    // })
    // .addMatcher(isActionPending(userSlice.name), state => {
    //     state.requestStatus = RequestStatus.Loading;
    // })
    // .addMatcher(
    //     isActionRejected(userSlice.name), state => {
    //         state.requestStatus = RequestStatus.Failed;
    //     }
    // )
  }
});

// export const checkUserAuth = createAsyncThunk(
//     'user/checkUser',
//     (_, { dispatch }) => {
//       if (getCookie('accessToken')) {
//         dispatch(getUserApi()).finally(() => {
//           dispatch(authChecked());
//         });
//       } else {
//         dispatch(authChecked());
//       }
//     }
// );
