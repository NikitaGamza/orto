import ProductListWrapper from '../ProductListWrapper';
import ProductItem from './ProductItem';

export default function ProductList(props) {
  const { products, loading, error } = props;

  return (
    <ProductListWrapper loading={loading} error={error}>
      <div className="flex_wrap_spacearound gap_20">
        {products &&
          products.map((product) => <ProductItem product={product} />)}
      </div>
    </ProductListWrapper>
  );
}
