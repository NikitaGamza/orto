import { Link } from 'react-router-dom';
//import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import ProductList from '../products/menu/ProductList';
import { Helmet } from 'react-helmet-async';
import ProductList from '../products/menu/ProductList';
import useProductFetch from '../products/useProductFetch';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [products, loading, error] = useProductFetch();

  return (
    <>
      <Helmet>
        <title>OrtoKomi</title>
      </Helmet>

      <div>
        <h1>Наши товары</h1>

        <ProductList products={products} loading={loading} error={error} />
      </div>
    </>
  );
}
