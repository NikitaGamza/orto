import { Link } from 'react-router-dom';
import Rating from './Rating';
// import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
// import Button from 'react-bootstrap/esm/Button';

export default function ProductList(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // const { data } = await axios.get(`/api/products/${item._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Извините, товар отсутствует')
    //   return
    // }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
      // payload: {...product, quantity: 1}//было
    });
    // navigate('/cart');
  };

  return (
    <div className="product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={`http://localhost:5000/static/images/products/${product.image[0]}.jpg`}
          alt={product.slug}
          className="product__img"
        />
      </Link>

      <div className="product__info">
        <Link to={`/product/${product.slug}`}>
          <strong>
            <p className="product__info__name">{product.name}</p>
            {product.size && <p>Размер: {product.size}</p>}
            {product.length && <p>Длинна: {product.length}</p>}
          </strong>
        </Link>
        {/* {product.countInStock === 0 ? (<Button variant='light' disabled>Нет в наличии</Button>) : (<Button></Button>)} */}
        <input
          onClick={() => addToCartHandler(product)}
          type="button"
          value="В корзину"
          className="product__info__cart"
        />
        <p>{product.price} руб.</p>
        <Rating rating={product.rating} numReviews={product.numReviews} />
      </div>
    </div>
  );
}
