import userSlice, {
  register,
  login,
  apiGetUser,
  updateUser,
  logout,
  initialState
} from '../src/slices/user';

const mockUser = {
  email: 'test@test.ru',
  name: 'testt'
};

describe('userSlice', () => {
  const expectedSuccessState = {
    isAuthChecked: true,
    user: mockUser,
    error: ''
  };

  const expectedErrorState = {
    isAuthChecked: false,
    user: { email: '', name: '' },
    error: 'Error'
  };

  const expectedLogoutState = {
    isAuthChecked: false,
    user: { email: '', name: '' },
    error: ''
  };

  const asyncActions = [
    { name: 'register', action: register },
    { name: 'login', action: login },
    { name: 'apiGetUser', action: apiGetUser },
    { name: 'updateUser', action: updateUser }
  ];

  describe('async actions', () => {
    test.each(asyncActions)('$name fulfilled', ({ action }) => {
      const actionObj = {
        type: action.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userSlice.reducer(initialState, actionObj);
      expect(state).toEqual(expectedSuccessState);
    });

    test.each(asyncActions)('$name rejected', ({ action }) => {
      const actionObj = {
        type: action.rejected.type,
        error: { message: 'Error' }
      };
      const state = userSlice.reducer(initialState, actionObj);
      expect(state).toEqual(expectedErrorState);
    });
  });

  describe('logout', () => {
    it('should handle logout fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual(expectedLogoutState);
    });
  });
});
