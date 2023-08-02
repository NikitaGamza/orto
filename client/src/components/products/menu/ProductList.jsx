import { Link } from 'react-router-dom';
// import Rating from './Rating';
// import axios from 'axios';
import { useContext } from 'react';
import ProductListWrapper from '../ProductListWrapper';
import ProductItem from './ProductItem';

export default function ProductList(props) {
  const { products, loading, error } = props;

  return (
    <ProductListWrapper loading={loading} error={error}>
      <div>
        {products &&
          products.map((product) => <ProductItem product={product} />)}
      </div>
    </ProductListWrapper>
  );
}
