import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeed } from '../../services/slicers/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/thunks/feedThunk';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора - done */
  const orders = useSelector(getFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
