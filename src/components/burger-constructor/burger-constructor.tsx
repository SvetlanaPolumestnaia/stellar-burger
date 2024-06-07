import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getBun,
  getConstructorIngredients,
  clearIngredients
} from '../../services/slicers/burgerContructorSlice';
import {
  getOrder,
  getOrderRequest,
  closeModal
} from '../../services/slicers/orderSlice';
import { fetchOrderBurger } from '../../services/thunks/orderThunk';
import { getUser } from '../../services/slicers/userSlice';
import { fetchFeed } from '../../services/thunks/feedThunk';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems - done, orderRequest и orderModalData из стора - done */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(getBun);
  const ingredients = useSelector(getConstructorIngredients);

  const constructorItems = {
    bun: bun,
    ingredients
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrder);

  const user = useSelector(getUser);
  const ingredientsIds = ingredients.map((ingredient) => ingredient._id);
  const bunId = bun?._id;

  const onOrderClick = () => {
    if (bunId && ingredientsIds.length >= 1) {
      const orderId = [bunId].concat(ingredientsIds, [bunId]);
      if (user && !orderRequest) {
        dispatch(fetchOrderBurger(orderId));
        dispatch(fetchFeed());
      } else {
        navigate('/login');
      }
    }
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
    dispatch(clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
