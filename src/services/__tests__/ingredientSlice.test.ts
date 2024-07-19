import ingredientReducer, {
  initialState,
  setIsIngredientLoading,
  getIngredientsByType,
  getIngredients,
  getIsIngredientLoading
} from '../slicers/ingredientSlice';
import { fetchIngredients } from '../thunks/ingredientThunk';
import { RequestStatus } from '../../utils/types';
import { bun, main, sauce, ingredients } from '../mockData/ingredientsMockData';

describe('Проверка IngredientSlice', () => {
  test('Проверка начального состояния', () => {
    const state = ingredientReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  test('Проверка setIsIngredientLoading', () => {
    const action = setIsIngredientLoading(true);
    const state = ingredientReducer(initialState, action);
    expect(state.isIngredientsLoading).toBe(true);
  });

  test('Проверка fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientReducer(initialState, action);
    expect(state.ingredients).toEqual(ingredients);
    expect(state.status).toBe(RequestStatus.Success);
  });

  test('Проверка isActionPending', () => {
    const action = { type: 'ingredients/fetchIngredients/pending' };
    const state = ingredientReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Проверка isActionRejected', () => {
    const action = { type: 'ingredients/fetchIngredients/rejected' };
    const state = ingredientReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Failed);
  });

  test('Проверка селекторов', () => {
    const state = {
      ingredients: {
        ingredients,
        status: RequestStatus.Idle,
        isIngredientsLoading: false
      }
    };
    expect(getIngredientsByType(state, 'bun')).toEqual([bun]);
    expect(getIngredientsByType(state, 'main')).toEqual([main]);
    expect(getIngredientsByType(state, 'sauce')).toEqual([sauce]);
    expect(getIngredients(state)).toEqual(ingredients);
    expect(getIsIngredientLoading(state)).toEqual(false);
  });
});
