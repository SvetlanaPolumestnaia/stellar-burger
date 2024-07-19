import burgerConstructorReducer, {
  addIngredient,
  moveIngredient,
  removeIngredient,
  clearIngredients
} from '../slicers/burgerContructorSlice';
import {
  addIngredientForTest,
  bun,
  main,
  sauce
} from '../mockData/burgerConstructorMockData';

describe('Проверка burgerConstructorSlice', () => {
  const initialBurgerConstructorState = {
    bun: bun,
    ingredients: [main, sauce]
  };

  test('Ингредиент добавляется в конструктор', () => {
    const newState = burgerConstructorReducer(
      initialBurgerConstructorState,
      addIngredient(addIngredientForTest)
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual([
      main,
      sauce,
      expect.objectContaining({
        ...addIngredientForTest,
        id: expect.any(String)
      })
    ]);
  });

  test('Булка добавляется в конструктор', () => {
    const newState = burgerConstructorReducer(
      initialBurgerConstructorState,
      addIngredient(bun)
    );

    const { bun: newBun } = newState;
    expect(newBun).toEqual(
      expect.objectContaining({ ...bun, id: expect.any(String) })
    );
  });

  test('Ингредиент удаляется из конструктора', () => {
    const newState = burgerConstructorReducer(
      initialBurgerConstructorState,
      removeIngredient(1)
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual([main]);
  });

  test('Порядок ингредиентов изменяется по кнопке вверх', () => {
    const newState = burgerConstructorReducer(
      initialBurgerConstructorState,
      moveIngredient({ index: 1, direction: 'up' })
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual([sauce, main]);
  });

  test('Порядок ингредиентов изменяется по кнопке вниз', () => {
    const newState = burgerConstructorReducer(
      initialBurgerConstructorState,
      moveIngredient({ index: 0, direction: 'down' })
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual([sauce, main]);
  });

  test('Очищение конструктора', () => {
    const newState = burgerConstructorReducer(
      initialBurgerConstructorState,
      clearIngredients()
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
