import { Helmet } from 'react-helmet-async';
import ProductList from '../components/menu/ProductList';
import useProductFetch from '../components/products/useProductFetch';


export default function HomePage() {
  const [products, loading, error] = useProductFetch();

  return (
    <>
      <Helmet>
        <title>OrtoKomi</title>
      </Helmet>

      <div>
        <h1>Наши товары</h1>

        <ProductList products={products} loading={loading} error={error} />
      </div>
    </>
  );
}
