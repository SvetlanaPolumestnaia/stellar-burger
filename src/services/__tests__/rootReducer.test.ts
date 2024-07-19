import store, { rootReducer } from '../store';

test('Правильная инициализация rootReducer', () => {
  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
  );
});
