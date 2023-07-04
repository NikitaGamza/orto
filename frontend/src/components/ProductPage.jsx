import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from './Rating';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Loading from './Loading';
import MessageBox from './MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  // console.log(product.numReviews);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Извините, товар отсутствует')
    //   return
    // }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
      // payload: {...product, quantity: 1}//было
    });
    navigate('/cart');
  };
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="flex_wrap_spacearound product__details">
      <div>
        {product.image.map((item) => {
          return (
            <img
              className="product__details__img"
              src={item}
              alt={product.name}
            />
          );
        })}
      </div>
      <Col md={3}>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <h1>{product.name}</h1>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p>Цена: {product.price}</p>
        {product.size ? <p>Размер: {product.size}</p> : <></>}
        {/* <p>Размер: {product.size}</p> */}
        {product.length ? <p>Длина: {product.length}</p> : <></>}
        {/* <p>Длина: {product.length}</p> */}
        {product.color.length !== 0 ? (
          <>
            <label htmlFor="color">Цвет: </label>
            <select name="color" id="color">
              {product.color.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </>
        ) : (
          <></>
        )}

        {/* <p>Цвет: {product.color}</p> */}
        <p>Фирма: {product.brand}</p>
        <p>Страна производитель: {product.country}</p>
        <p>Описание товара:</p>
        <p>{product.description}</p>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Цена: </Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button onClick={addToCartHandler} variant="primary">
                  Добавить в корзину
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
