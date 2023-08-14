import { useContext } from 'react';
import { Store } from '../../../Store';
import { Link } from 'react-router-dom';
import Rating from '../../Rating';

export default function ProductItem(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
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
            {product.category && <p>Категория: {product.category}</p>}
          </strong>
        </Link>

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
