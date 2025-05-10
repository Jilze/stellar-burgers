import { expect, describe } from '@jest/globals';
import {
  getIngredientsList,
  ingredientSlice,
  initialState
} from '../src/slices/ingredients';

const mockBun = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  nutrients: { proteins: 80, fat: 24, carbohydrates: 53, calories: 420 },
  price: 1255,
  images: {
    default: 'https://code.s3.yandex.net/react/code/bun-02.png',
    mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  __v: 0
};

describe('ingredientSlice reducer', () => {
  describe('handle ingredients fetching lifecycle', () => {
    it('should set loading state when pending', () => {
      const action = getIngredientsList.pending('');
      const state = ingredientSlice.reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state).toEqual(
        expect.objectContaining({
          ...initialState,
          loading: true
        })
      );
    });

    it('should populate ingredients when fulfilled', () => {
      const previousState = { ...initialState, loading: true };
      const action = getIngredientsList.fulfilled([mockBun], '');
      const state = ingredientSlice.reducer(previousState, action);

      expect(state).toMatchObject({
        loading: false,
        ingredients: [mockBun],
        error: null
      });
      expect(state.ingredients).toHaveLength(1);
    });

    it('should handle error state when rejected', () => {
      const error = new Error('Network Error');
      const action = getIngredientsList.rejected(error, '');
      const state = ingredientSlice.reducer(
        { ...initialState, loading: true },
        action
      );

      expect(state.loading).toBe(false);
      expect(state.error).toMatch(/error/i);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Network Error'
      });
    });
  });
});
