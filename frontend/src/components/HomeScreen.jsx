import { Link } from 'react-router-dom';
//import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import ProductList from './ProductList';
import { Helmet } from 'react-helmet-async';
import Loading from './Loading';
import MessageBox from './MessageBox';

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

export default function HomeScreen() {
  //   const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>OrtoKomi</title>
      </Helmet>
      <h1>Наши товары</h1>
      <div className="flex_wrap_spacearound gap_20">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          // <Row>
          products.map((product) => (
            // <Col sm={6} md={4} lg={3} className="mb-3">
            <ProductList product={product} />
            // </Col>
          ))
          // </Row>
        )}
      </div>
    </div>
  );
}
