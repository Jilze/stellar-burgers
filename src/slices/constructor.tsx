import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        payload.type === 'bun'
          ? (state.bun = payload)
          : state.ingredients.push(payload);
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },

    deleteItem: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== payload.id
      );
    },

    clearAll: (state) => {
      state.bun = null;
      state.ingredients = [];
    },

    updateAll: (
      state,
      { payload }: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = payload;
    }
  },
  selectors: {
    selectItems: (state: TConstructorState) => state
  }
});

export const { addItem, deleteItem, clearAll, updateAll } =
  constructorSlice.actions;

export const constructorSelector = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
