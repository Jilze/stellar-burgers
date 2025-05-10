import { rootReducer } from '../src/services/store';
import { ingredientSlice } from '../src/slices/ingredients';
import { newOrderSlice } from '../src/slices/new-order';
import { orderCreation } from '../src/slices/order-creation';
import { userSlice } from '../src/slices/user';
import { feedSlice } from '../src/slices/feeds';
import { constructorSlice } from '../src/slices/constructor';

describe('rootReducer initialization verification', () => {
  const initAction = { type: '@@redux/INIT' };

  const testCases = [
    { key: 'user', slice: userSlice },
    { key: 'ingredients', slice: ingredientSlice },
    { key: 'constructorIngredient', slice: constructorSlice },
    { key: 'feeds', slice: feedSlice },
    { key: 'newOrder', slice: newOrderSlice },
    { key: 'orders', slice: orderCreation }
  ];

  testCases.forEach(({ key, slice }) => {
    it(`should initialize ${key} slice correctly`, () => {
      const state = rootReducer(undefined, initAction);
      const sliceState = slice.reducer(undefined, initAction);

      expect(state[key]).toEqual(sliceState);
    });
  });

  it('should return full initial state structure', () => {
    const state = rootReducer(undefined, initAction);

    expect(state).toMatchObject({
      user: expect.any(Object),
      ingredients: expect.any(Object),
      constructorIngredient: expect.any(Object),
      feeds: expect.any(Object),
      newOrder: expect.any(Object),
      orders: expect.any(Object)
    });
  });
});
