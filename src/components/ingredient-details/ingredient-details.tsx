import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../slices/ingredients';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector(getIngredients).find((i) => i._id === id);

  return ingredientData ? (
    <IngredientDetailsUI ingredientData={ingredientData} />
  ) : (
    <Preloader />
  );
};
