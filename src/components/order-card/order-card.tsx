import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../slices/ingredients';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '@ui';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients = useSelector(getIngredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;
    const ingredientsInfo = order.ingredients
      .map((id) => ingredients.find((i) => i._id === id))
      .filter(Boolean) as TIngredient[];
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow: ingredientsInfo.slice(0, maxIngredients),
      remains:
        ingredientsInfo.length - maxIngredients > 0
          ? ingredientsInfo.length - maxIngredients
          : 0,
      total: ingredientsInfo.reduce((sum, { price }) => sum + price, 0),
      date: new Date(order.createdAt)
    };
  }, [order, ingredients]);

  return (
    orderInfo && (
      <OrderCardUI
        orderInfo={orderInfo}
        maxIngredients={maxIngredients}
        locationState={{ background: location }}
      />
    )
  );
});
