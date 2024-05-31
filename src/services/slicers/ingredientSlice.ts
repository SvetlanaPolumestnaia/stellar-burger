import { RequestStatus, TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '../thunks/ingredientThunk';
import { isActionPending, isActionRejected } from '../../utils/redux';

export const sliceName = 'ingredients';

export interface TIngredientState {
  ingredients: TIngredient[];
  status: RequestStatus;
}

const initialState: TIngredientState = {
  ingredients: [],
  status: RequestStatus.Idle
};

export const ingredientSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.status = RequestStatus.Success;
      })
      .addMatcher(isActionPending(ingredientSlice.name), (state) => {
        state.status = RequestStatus.Loading;
      })
      .addMatcher(isActionRejected(ingredientSlice.name), (state) => {
        state.status = RequestStatus.Loading;
      });
  },
  selectors: {
    getIngredientsByType: (state, type) =>
      state.ingredients.filter((ingredient) => ingredient.type === type),
    getIngredients: (state) => state.ingredients
  }
});

export default ingredientSlice.reducer;

export const { getIngredientsByType, getIngredients } =
  ingredientSlice.selectors;

// отображаются ингредиенты по вкладкам
