import { RequestStatus, TIngredient } from '../../utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '../thunks/ingredientThunk';
import { isActionPending, isActionRejected } from '../../utils/redux';

export const sliceName = 'ingredients';

export interface TIngredientState {
  ingredients: TIngredient[];
  status: RequestStatus;
  isIngredientsLoading: boolean;
}

export const initialState: TIngredientState = {
  ingredients: [],
  status: RequestStatus.Idle,
  isIngredientsLoading: false
};

export const ingredientSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setIsIngredientLoading: (state, action: PayloadAction<boolean>) => {
      state.isIngredientsLoading = action.payload;
    }
  },
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
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getIngredientsByType: (state, type) =>
      state.ingredients.filter((ingredient) => ingredient.type === type),
    getIngredients: (state) => state.ingredients,
    getIsIngredientLoading: (state) => state.isIngredientsLoading
  }
});

export default ingredientSlice.reducer;

export const { getIngredientsByType, getIngredients, getIsIngredientLoading } =
  ingredientSlice.selectors;

export const { setIsIngredientLoading } = ingredientSlice.actions;
