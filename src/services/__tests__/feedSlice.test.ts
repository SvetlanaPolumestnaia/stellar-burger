import { fetchFeed } from '../thunks/feedThunk';
import feedReducer, { initialState } from '../slicers/feedSlice';
import { feed } from '../mockData/feedMockData';

describe('Проверка feedSlice', () => {
  test('Селекторы работают', () => {
    const expectedResult = feed;
    const state = feedReducer(initialState, {
      type: fetchFeed.fulfilled.type,
      payload: {
        success: true,
        orders: feed.orders,
        total: 5,
        totalToday: 4
      }
    });
    expect(state.orders).toEqual(expectedResult.orders);
    expect(state.total).toEqual(expectedResult.total);
    expect(state.totalToday).toEqual(expectedResult.totalToday);
  });
});
