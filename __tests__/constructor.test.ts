import {
  addItem,
  constructorSlice,
  deleteItem,
  initialState,
  constructorReducer,
  clearAll,
  updateAll
} from '../src/slices/constructor';

const mockBun = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: '1'
};

const mockIngredient = {
  _id: '2',
  id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

describe('constructorSlice reducer', () => {
  describe('when adding items', () => {
    it('should add an ingredient to the list', () => {
      const result = constructorSlice.reducer(
        initialState,
        addItem(mockIngredient)
      );

      expect(result.ingredients).toHaveLength(1);
    });

    it('should add a bun to the bun field', () => {
      const result = constructorSlice.reducer(initialState, addItem(mockBun));

      expect(result.bun?._id).toBe('1');
    });
  });

  describe('when removing items', () => {
    it('should remove an ingredient from the list', () => {
      const stateWithIngredient = {
        bun: null,
        ingredients: [mockIngredient]
      };

      const result = constructorSlice.reducer(
        stateWithIngredient,
        deleteItem(mockIngredient)
      );

      expect(result.ingredients).toHaveLength(0);
    });

    it('should remove the bun when deleting bun item', () => {
      const result = constructorSlice.reducer(
        initialState,
        deleteItem(mockBun)
      );

      expect(result.bun).toBeNull();
    });
  });

  describe('when clearing all', () => {
    it('should reset state to initial state', () => {
      const stateWithItems = {
        bun: {
          id: '1',
          type: 'bun',
          name: 'Краторная булка N-200i'
        },
        ingredients: [
          {
            id: '2',
            name: 'Биокотлета из марсианской Магнолии'
          }
        ]
      };

      const result = constructorReducer(stateWithItems, clearAll());

      expect(result).toEqual(initialState);
    });
  });

  describe('when updating all ingredients', () => {
    it('should replace ingredients with new array', () => {
      const newIngredients = [
        { id: '3', name: 'Биокотлета из марсианской Магнолии' },
        { id: '4', name: 'Соус фирменный Space Sauce' }
      ];

      const result = constructorReducer(
        initialState,
        updateAll(newIngredients)
      );

      expect(result.ingredients).toEqual(newIngredients);
    });
  });
});
