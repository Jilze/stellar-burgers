import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../slices/ingredients';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState<TOrder>({
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  });
  const { number } = useParams();
  const ingredients = useSelector(getIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = { ...ingredient, count: (acc[item]?.count || 0) + 1 };
        }
        return acc;
      },
      {} as Record<string, TIngredient & { count: number }>
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, { price, count }) => acc + price * count,
      0
    );
    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  useEffect(() => {
    getOrderByNumberApi(Number(number))
      .then(({ orders }) => setOrderData(orders[0]))
      .catch(console.log);
  }, [number]);

  return orderInfo ? <OrderInfoUI orderInfo={orderInfo} /> : <Preloader />;
};
