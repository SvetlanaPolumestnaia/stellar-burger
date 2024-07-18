import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slicers/ingredientSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/thunks/ingredientThunk';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора - done */
  const ingredients = useSelector(getIngredients);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const currentIngredient = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (ingredients.length === 0) {
    return <Preloader />;
  }

  return (
    <div>
      {currentIngredient && (
        <IngredientDetailsUI ingredientData={currentIngredient} />
      )}
    </div>
  );
};
