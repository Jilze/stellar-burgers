import newOrderSlice, {
  placeNewOrder,
  resetOrder,
  initialState
} from '../src/slices/new-order';

describe('newOrderSlice reducers', () => {
  describe('initial state', () => {
    it('should return initial state when no action is provided', () => {
      const result = newOrderSlice.reducer(undefined, { type: undefined });
      expect(result).toEqual(initialState);
    });
  });

  describe('resetOrder action', () => {
    const mockFilledState = {
      loading: true,
      order: {
        _id: '671a8f96d829be001c7787ea',
        ingredients: [
          'Флюоресцентная булка R2-D3',
          'Флюоресцентный spicy люминесцентный бургер',
          'Филе Люминесцентного тетраодонтимформа',
          'Соус Spicy-X',
          'Флюоресцентная булка R2-D3'
        ],
        status: 'done',
        name: 'Флюоресцентный spicy люминесцентный бургер',
        createdAt: '2024-10-24T18:19:02.774Z',
        updatedAt: '2024-10-24T18:19:03.715Z',
        number: 57403
      },
      error: 'Error message'
    };

    it('should reset state to initial values', () => {
      const action = resetOrder();
      const result = newOrderSlice.reducer(mockFilledState, action);

      expect(result).toMatchObject(initialState);
      expect(result.loading).toBe(false);
    });
  });

  describe('placeNewOrder action handlers', () => {
    const testCases = [
      {
        name: 'should handle pending state',
        action: { type: placeNewOrder.pending.type },
        expected: {
          loading: true,
          order: null,
          error: undefined
        }
      },
      {
        name: 'should handle fulfilled state',
        action: {
          type: placeNewOrder.fulfilled.type,
          payload: { order: 'mockOrderData' }
        },
        expected: {
          loading: false,
          order: 'mockOrderData',
          error: undefined
        }
      },
      {
        name: 'should handle rejected state',
        action: {
          type: placeNewOrder.rejected.type,
          error: { message: 'Network Error' }
        },
        expected: {
          loading: false,
          order: null,
          error: 'Network Error'
        }
      }
    ];

    test.each(testCases)('$name', ({ action, expected }) => {
      const result = newOrderSlice.reducer(initialState, action);

      expect(result.loading).toBe(expected.loading);
      expect(result.order).toEqual(expected.order);
      expect(result.error).toBe(expected.error);
    });
  });
});
