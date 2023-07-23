import React, { useState } from 'react';
import './productControl.scss';
// import { Link } from 'react-router-dom';
//import data from '../data';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
// import { Helmet } from 'react-helmet-async';
import Loading from './Loading';
import MessageBox from './MessageBox';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

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

export default function ProductControl() {
  const [visibleAdd, setVisibleAdd] = useState(false);
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
      <span>
        <h3 className="control-add-head">Добавить новый товар </h3>
        <input
          className="control-add"
          type="button"
          value="+"
          onClick={() => setVisibleAdd(!visibleAdd)}
        />
      </span>
      {visibleAdd && (
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Наименование</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Ссылка</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Категория</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Наименование</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Артикул</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Размер</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Цвет</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Длинна</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Цена</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Производитель</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Страна</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Описание</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Button type="submit">Добавить</Button>
        </Form>
      )}

      <div className="flex_wrap_spacearound gap_20">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          products.map((product) => (
            <div className="control-wrap">
              <div className="control-row">
                <img
                  src={product.image[0]}
                  alt=""
                  srcset=""
                  className="control-img"
                />
                <div>
                  <div>{product.name}</div>{' '}
                  {product.size && <div>Размер: {product.size} </div>}
                  {product.length && <div>Длинна: {product.length}</div>}
                  <div>Цена: {product.price} руб</div>
                  <div>Производитель: {product.brand}</div>
                  <div>Страна: {product.country}</div>
                  <div>Описание: {product.description}</div>
                  <div>Ссылка: {product.slug}</div>
                </div>
                <div>
                  <input
                    className="control-edit"
                    type="button"
                    value="Редактировать"
                  />
                  <input
                    className="control-edit"
                    type="button"
                    value="Удалить"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
