import React, { useState } from 'react';
import './ProductControl.scss';
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
import ModalEdit from './ModalEdit';

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
  const [productId, setProductId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [nameProduct, setNameProduct] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [length, setLength] = useState('');
  const [size, setSize] = useState('');
  const [articul, setArticul] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
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

  const addProduct = async (e) => {
    e.preventDefault();

    files.forEach(async (file, index) => {
      const formData = new FormData();

      formData.append('images', file);

      formData.append('names', `${nameProduct}-${articul}-${index}`);

      await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      }).catch((error) => console.error(error));
    });

    const newProduct = {
      image: files.map((item, index) => `${nameProduct}-${articul}-${index}`),
      name: nameProduct,
      slug,
      category,
      articul,
      size,
      color: color.split(',').map((i) => i.trim()),
      length,
      price: Number(price),
      brand,
      country,
      description,
    };

    const body = JSON.stringify(newProduct);

    try {
      const response = await fetch('/api/products/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  };

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
        <>
          <Form onSubmit={(e) => addProduct(e)}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Картинки</Form.Label>
              <input
                type="file"
                name=""
                id=""
                multiple
                onChange={(event) => {
                  const files = event.target.files;

                  for (let i = 0; i < files.length; i++) {
                    const file = files.item(i);

                    setFiles((prevValue) => [...prevValue, file]);
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Наименование</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setNameProduct(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Ссылка</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setSlug(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Категория</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Артикул</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setArticul(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Размер</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Цвет</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Длинна</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Производитель</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Страна</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button type="submit">Добавить</Button>
          </Form>
        </>
      )}

      <div className="flex_wrap_spacearound gap_20">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.map((product) => (
              <div className="control-wrap">
                <div className="control-row">
                  <img
                    src={`http://localhost:5000/static/images/products/${product.image[0]}.jpg`}
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
                    <div>Артикул: {product.articul}</div>
                  </div>
                  <div>
                    <input
                      className="control-edit"
                      type="button"
                      value="Редактировать"
                      onClick={() => {
                        setModalVisible(true);
                        setProductId(product._id);
                      }}
                    />
                    <input
                      className="control-edit"
                      type="button"
                      value="Удалить"
                    />
                  </div>
                </div>
              </div>
            ))}

            <ModalEdit
              isVisible={modalVisible}
              setIsVisible={setModalVisible}
              id={productId}
            />
          </>
        )}
      </div>
    </div>
  );
}
