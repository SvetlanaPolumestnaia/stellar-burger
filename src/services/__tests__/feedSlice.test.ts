// tests/feedSlice.test.ts
import { configureStore, Store } from '@reduxjs/toolkit';
import feedReducer, {
  initialState,
  getFeed,
  getTotal,
  getTotalToday,
  TFeedState
} from '../slicers/feedSlice';
import { fetchFeed } from '../thunks/feedThunk';
import { RequestStatus } from '../../utils/types';
import { feed } from '../mockData/feedMockData';

describe('Проверка feedSlice', () => {
  let store: Store<{ feed: TFeedState }>;

  beforeEach(() => {
    store = configureStore({
      reducer: { feed: feedReducer },
      preloadedState: { feed: initialState }
    });
  });

  test('Проверка начального состояния', () => {
    const state = store.getState().feed;
    expect(state).toEqual(initialState);
  });

  test('Проверка fetchFeed.fulfilled', () => {
    store.dispatch(fetchFeed.fulfilled(feed, '', undefined));
    const state = store.getState().feed;
    expect(state.orders).toEqual(feed.orders);
    expect(state.total).toEqual(feed.total);
    expect(state.totalToday).toEqual(feed.totalToday);
    expect(state.status).toEqual(RequestStatus.Success);
  });

  test('Проверка fetchFeed.pending', () => {
    store.dispatch(fetchFeed.pending('', undefined));
    const state = store.getState().feed;
    expect(state.status).toEqual(RequestStatus.Loading);
  });

  test('Проверка fetchFeed.rejected', () => {
    store.dispatch(fetchFeed.rejected(null, '', undefined));
    const state = store.getState().feed;
    expect(state.status).toEqual(RequestStatus.Failed);
  });

  test('Проверка селекторов', () => {
    const state: { feed: TFeedState } = {
      feed: {
        ...initialState,
        orders: feed.orders,
        total: feed.total,
        totalToday: feed.totalToday,
        status: RequestStatus.Success
      }
    };

    expect(getFeed(state)).toEqual(feed.orders);
    expect(getTotal(state)).toEqual(feed.total);
    expect(getTotalToday(state)).toEqual(feed.totalToday);
  });
});
