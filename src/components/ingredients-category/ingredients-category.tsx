import { forwardRef, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { constructorSelector } from '../../slices/constructor';
import { IngredientsCategoryUI } from '@ui';
import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients, ...rest }, ref) => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    constructorSelector.selectItems
  );

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    constructorIngredients.forEach(
      ({ _id }) => (counters[_id] = (counters[_id] || 0) + 1)
    );
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
      {...rest}
    />
  );
});
