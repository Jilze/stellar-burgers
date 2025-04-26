import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientReducer = ingredientSlice.reducer;

export const getIngredientsState = (state: {
  ingredients: TIngredientsState;
}): TIngredientsState => state.ingredients;

export const getIngredientsLoadingState = (state: {
  ingredients: TIngredientsState;
}): boolean => state.ingredients.loading;

export const getIngredients = (state: {
  ingredients: TIngredientsState;
}): TIngredient[] => state.ingredients.ingredients;
