import orderReducer, {
    initialState,
    closeModal,
    getOrder,
    getOrderRequest,
    getOrderByNumber
  } from '../slicers/orderSlice';
  import { fetchOrderBurger, fetchOrderByNumber } from '../thunks/orderThunk';
  import { RequestStatus } from '../../utils/types';
  import { order } from '../mockData/orderMockData';
  
  describe('Проверка orderSlice', () => {
    test('Should return the initial state', () => {
      const state = orderReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  
    test('Проверка закрытия модального окна', () => {
      const action = closeModal();
      const state = orderReducer(initialState, action);
      expect(state.order).toBe(null);
      expect(state.orderRequest).toBe(false);
    });
  
    test('Проверка fetchOrderBurger.fulfilled', () => {
      const action = { type: fetchOrderBurger.fulfilled.type, payload: { order: order } };
      const state = orderReducer(initialState, action);
      expect(state.order).toEqual(order);
      expect(state.orderRequest).toBe(false);
      expect(state.status).toBe(RequestStatus.Success);
    });
  
    test('Проверка fetchOrderByNumber.fulfilled', () => {
      const action = { type: fetchOrderByNumber.fulfilled.type, payload: { orders: [order] } };
      const state = orderReducer(initialState, action);
      expect(state.orderByNumber).toEqual(order);
    });
  
    test('Проверка isActionPending', () => {
      const action = { type: 'order/fetchOrderBurger/pending' };
      const state = orderReducer(initialState, action);
      expect(state.status).toBe(RequestStatus.Loading);
    });
  
    test('Проверка isActionRejected', () => {
      const action = { type: 'order/fetchOrderBurger/rejected' };
      const state = orderReducer(initialState, action);
      expect(state.status).toBe(RequestStatus.Failed);
    });
  
    test('Селекторы работают', () => {
      const state = {
        order: {
          order: order,
          status: RequestStatus.Idle,
          orderRequest: false,
          orderByNumber: order
        }
      };
      expect(getOrder(state)).toEqual(order);
      expect(getOrderRequest(state)).toEqual(false);
      expect(getOrderByNumber(state)).toEqual(order);
    });
  });
  