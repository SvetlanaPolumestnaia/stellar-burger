// import { RequestStatus, TOrder } from '@utils-types';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '../utils/burger-api';
// import { RootState } from './store';

// export const sliceName = 'feed';

// export interface TFeedState {
//     orders: TOrder[],
//     total: number,
//     totalToday: number,
//     status: RequestStatus
// }

// const initialState: TFeedState = {
//     orders: [],
//     total: 0,
//     totalToday: 0,
//     status: RequestStatus.Idle
// };

// export const feedSlice = createSlice({
//   name: sliceName,
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFeed.pending, (state) => {
//         state.status = RequestStatus.Loading;
//       })
//       .addCase(fetchFeed.fulfilled, (state, action) => {
//         state.ingredients = action.payload;
//         //console.log(state.ingredients);
//         state.status = RequestStatus.Success;
//       })
//       .addCase(fetchFeed.rejected, (state, action) => {
//         state.status = RequestStatus.Failed;
//       });
//   }
// });

// export const fetchFeed = createAsyncThunk(
//   'ingredients/fetchIngredients',
//   async () => {
//     const response = await getIngredientsApi();
//     //console.log(response);
//     return response;
//   }
// );

// export const selectIngredients = (state: RootState): TIngredient[] => {
//   //console.log(state.ingredients.ingredients);
//   return state.ingredients.ingredients;
// };

// export default feedSlice.reducer;
