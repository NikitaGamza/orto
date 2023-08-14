import axios from 'axios';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ActionTypes, Store } from '../../Store';

const useProductFetch = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    product: { list, loading, error, isUpdateList },
  } = state;

  const productFetch = async () => {
    const actionFetchRequest = {
      type: 'FETCH_PRODUCT_REQUEST',
    };

    ctxDispatch(actionFetchRequest);

    try {
      const productsResponse = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const products = await productsResponse.json();
      const fetchSuccessAction = {
        type: 'FETCH_PRODUCT_SUCCESS',
        payload: products,
      };
      ctxDispatch(fetchSuccessAction);
    } catch (err) {
      const fetchFailAction = {
        type: 'FETCH_PRODUCT_FAIL',
      };
      ctxDispatch(fetchFailAction);
    }
  };

  useEffect(() => {
    if (isUpdateList) {
      productFetch();
      ctxDispatch({
        type: ActionTypes.UPDATE_LIST_FINISH,
      });
    }
  }, [isUpdateList]);

  return [list, loading, error];
};

export default useProductFetch;
