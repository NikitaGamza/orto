import ProductListWrapper from '../ProductListWrapper';

export default function ProductList(props) {
  const { products, loading, error } = props;

  return (
    <ProductListWrapper loading={loading} error={error}>
      <div className="flex_wrap_spacearound gap_20">
        {products &&
          products.map((product) => <ProductList product={product} />)}
      </div>
    </ProductListWrapper>
  );
}
