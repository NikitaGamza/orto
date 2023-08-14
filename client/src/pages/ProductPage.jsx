import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/menu/Rating';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/ui/Loading';
import MessageBox from '../components/ui/MessageBox';
import { getError } from '../utils';
import { ActionTypes, Store } from '../Store';


export default function ProductPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    loading, error, product
  } = state.product.detail;

  const params = useParams();
  const { slug } = params;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      ctxDispatch({ type:  ActionTypes.FETCH_REQUEST_PRODUCT_DETAILS });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        ctxDispatch({ type: ActionTypes.FETCH_SUCCESS_PRODUCT_DETAILS, payload: result.data });
      } catch (err) {
        ctxDispatch({ type: ActionTypes.FETCH_FAIL_PRODUCT_DETAILS, payload: getError(err) });
      }
    };

    fetchData();
  }, [slug]);


  const addToCartHandler = async () => {
    ctxDispatch({
      type: ActionTypes.CART_ADD_ITEM,
      payload: { ...product },
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
          console.log(item);
          return (
            <img
              className="product__details__img"
              src={`http://localhost:5000/static/images/products/${item}.jpg`}
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

        {product.length ? <p>Длина: {product.length}</p> : <></>}


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
