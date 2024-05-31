import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { removeIngredient, moveIngredient } from '../../services/slicers/burgerContructorSlice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
      /** TODO: дописать функции - done */
      
    const dispatch = useDispatch();

    const handleMoveDown = () => {dispatch(moveIngredient({index, direction: 'down'}))};

    const handleMoveUp = () => {dispatch(moveIngredient({index, direction: 'up'}))};

    const handleClose = () => {dispatch(removeIngredient(index))};

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
