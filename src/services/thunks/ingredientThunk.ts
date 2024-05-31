import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk('ingredients', async () => {
  const response = await getIngredientsApi();
  return response;
});
