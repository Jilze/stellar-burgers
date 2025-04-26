import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getAllFeeds, getOrdersFeed } from '../../slices/feeds';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersFeed);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  return orders.length ? (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  ) : (
    <Preloader />
  );
};
