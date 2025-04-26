import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { clearAll, constructorSelector } from '../../slices/constructor';
import { useDispatch, useSelector } from '../../services/store';
import {
  placeNewOrder,
  getOrderData,
  getOrderLoad,
  resetOrder
} from '../../slices/new-order';
import { isAuthCheckedSelector } from '../../slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector(constructorSelector.selectItems);
  const orderRequest = useSelector(getOrderLoad);
  const orderModalData = useSelector(getOrderData);
  const isAuthenticated = useSelector(isAuthCheckedSelector);

  const handleOrderClick = () => {
    if (!isAuthenticated) return navigate('/login');
    if (!bun || orderRequest) return;
    dispatch(placeNewOrder([bun._id, ...ingredients.map((i) => i._id)]));
  };

  const handleCloseOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearAll());
    navigate('/');
  };

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (total, { price }) => total + price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
