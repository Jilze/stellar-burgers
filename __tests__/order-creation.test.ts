import { configureStore } from '@reduxjs/toolkit';
import { getUserOrders, orderCreation } from '../src/slices/order-creation';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(() =>
    Promise.resolve([
      {
        _id: '66d7fc9d119d45001b503fa1',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Квантовый бургер',
        createdAt: '2024-09-04T06:22:21.104Z',
        updatedAt: '2024-09-04T06:22:21.577Z',
        number: 51930
      }
    ])
  )
}));

describe('userOrders slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: orderCreation.reducer
    });
  });

  it('should handle pending state', async () => {
    await store.dispatch(getUserOrders.pending());
    const state = store.getState();

    expect(state.loading).toBe(true);
    expect(state.orders).toEqual([]);
  });

  it('should handle fulfilled state', async () => {
    const mockOrders = [
      {
        _id: '66e9f8b2119d45001b507802',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy био-марсианский минеральный бургер',
        createdAt: '2024-09-17T21:46:26.339Z',
        updatedAt: '2024-09-17T21:46:26.815Z',
        number: 53260
      }
    ];

    await store.dispatch(getUserOrders.fulfilled(mockOrders));
    const state = store.getState();

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('should handle rejected state', async () => {
    await store.dispatch(getUserOrders.rejected(new Error('Network error')));
    const state = store.getState();

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
  });
});
