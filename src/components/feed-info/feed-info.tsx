import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  getOrdersFeed,
  getTotalFeed,
  getTotalTodayFeed
} from '../../slices/feeds';

const getOrders = (orders: TOrder[], status: string) =>
  orders
    .filter(({ status: s }) => s === status)
    .map(({ number }) => number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(getOrdersFeed);
  const feed = {
    total: useSelector(getTotalFeed),
    totalToday: useSelector(getTotalTodayFeed)
  };

  return (
    <FeedInfoUI
      readyOrders={getOrders(orders, 'done')}
      pendingOrders={getOrders(orders, 'pending')}
      feed={feed}
    />
  );
};
