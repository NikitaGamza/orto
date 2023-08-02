import axios from 'axios';
import { useContext, useLayoutEffect } from 'react';
import { Store } from '../../Store';

const useProductFetch = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    product: { list, loading, error },
  } = state;

  const productFetch = async () => {
    const actionFetchRequest = {
      type: 'FETCH_PRODUCT_REQUEST',
    };

    ctxDispatch(actionFetchRequest);

    try {
      const products = await axios.get('/api/products');
      const fetchSuccessAction = {
        type: 'FETCH_PRODUCT_SUCCESS',
        payload: products.data,
      };
      ctxDispatch(fetchSuccessAction);
    } catch (err) {
      const fetchFailAction = {
        type: 'FETCH_PRODUCT_FAIL',
      };
      ctxDispatch(fetchFailAction);
    }
  };

  useLayoutEffect(() => {
    productFetch();
  }, []);

  return [list, loading, error];
};

export default useProductFetch;
