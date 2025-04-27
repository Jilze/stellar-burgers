import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import {
  createSlice,
  createAsyncThunk,
  isFulfilled,
  isRejected,
  isPending
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

const handleAuth = async (apiFn: any, userData: any) => {
  const data = await apiFn(userData);
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const apiGetUser = createAsyncThunk('user/getuser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const register = createAsyncThunk(
  'registerUser',
  (data: TRegisterData) => handleAuth(registerUserApi, data)
);
export const login = createAsyncThunk('loginUser', (data: TLoginData) =>
  handleAuth(loginUserApi, data)
);
export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  user: { email: '', name: '' },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.user = { email: '', name: '' };
      })
      .addMatcher(
        isFulfilled(register, login, apiGetUser, updateUser),
        (state, { payload }: any) => {
          state.isAuthChecked = true;
          state.user = payload.user;
          state.error = '';
        }
      )
      .addMatcher(
        isRejected(register, login, apiGetUser, updateUser),
        (state, { error }) => {
          state.isAuthChecked = false;
          state.error = error.message!;
        }
      )
      .addMatcher(isPending(register, login, updateUser), (state) => {
        state.isAuthChecked = false;
        state.error = '';
      });
  },
  selectors: {
    isAuthCheckedSelector: (state: TUserState) => state.isAuthChecked,
    getUser: (state) => state.user,
    getUserName: (state) => state.user.name,
    getError: (state) => state.error
  }
});

export const { isAuthCheckedSelector, getUser, getUserName, getError } =
  userSlice.selectors;
export default userSlice;
