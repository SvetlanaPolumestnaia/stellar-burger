import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceName = 'constructor';

type TBurgerConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};

const createRandomId = () => Math.random().toString().slice(2);

export const burgerConstructorSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const newPayload = { ...ingredient, id: createRandomId() };
        return { payload: newPayload };
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(index, 1);
    },
    moveIngredient: (state, action: PayloadAction<{index: number, direction: string}>) => {
      const { index, direction } = action.payload;
      const newIndex = direction === 'up' ? index -1 : index +1;
      if (newIndex >= 0) {
        const savingState = state.ingredients[index];
        state.ingredients[index] = state.ingredients[newIndex];
        state.ingredients[newIndex] = savingState;
      } 
    }
  }
});

export default burgerConstructorSlice.reducer;
export const { addIngredient, removeIngredient, moveIngredient } = burgerConstructorSlice.actions;
export const getBun = (state: { burgerConstructor: TBurgerConstructor }) => state.burgerConstructor.bun;
export const getConstructorIngredients = (state: { burgerConstructor: TBurgerConstructor }) => state.burgerConstructor.ingredients

