import userReducer, {
  initialState,
  setUser,
  setIsAuthChecked,
  getUser,
  getUserOrders,
  getIsAuthChecked
} from '../slicers/userSlice';
import {
  fetchLogin,
  fetchProfileOrders,
  fetchRegister,
  logout
} from '../thunks/userThunk';
import { RequestStatus } from '../../utils/types';
import { user } from '../mockData/userMockData';
import { orders } from '../mockData/orderMockData';

describe('Проверка userSlice', () => {
  test('Should return the initial state', () => {
    const state = userReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  test('Проверка setUser', () => {
    const action = setUser(user);
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(user);
  });

  test('Проверка setIsAuthChecked', () => {
    const action = setIsAuthChecked(true);
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Проверка fetchRegister.fulfilled', () => {
    const action = { type: fetchRegister.fulfilled.type, payload: user };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Проверка fetchLogin.fulfilled', () => {
    const action = { type: fetchLogin.fulfilled.type, payload: user };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Проверка fetchProfileOrders.fulfilled', () => {
    const action = { type: fetchProfileOrders.fulfilled.type, payload: orders };
    const state = userReducer(initialState, action);
    expect(state.userOrders).toEqual(orders);
  });

  test('Проверка logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state.user).toBe(null);
  });

  test('Проверка isActionPending', () => {
    const action = { type: 'user/fetchLogin/pending' };
    const state = userReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Проверка isActionRejected', () => {
    const action = { type: 'user/fetchLogin/rejected' };
    const state = userReducer(initialState, action);
    expect(state.status).toBe(RequestStatus.Failed);
  });

  test('Селекторы работают', () => {
    const state = {
      user: {
        isAuthChecked: true,
        user: user,
        status: RequestStatus.Idle,
        userOrders: orders
      }
    };
    expect(getUser(state)).toEqual(user);
    expect(getUserOrders(state)).toEqual(orders);
    expect(getIsAuthChecked(state)).toEqual(true);
  });
});
