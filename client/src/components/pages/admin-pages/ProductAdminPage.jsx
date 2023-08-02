import React, { useState } from 'react';
import './ProductAdminPage.scss';
import { useEffect, useReducer } from 'react';
import ProductList from '../../products/admin/ProductList';
import useProductFetch from '../../products/useProductFetch';
import ProductAdd from '../../products/admin/ProductAdd';

export function Control(props) {
  const { visibleAdd, setVisibleAdd } = props;

  return (
    <span>
      <h3 className="control-add-head">Добавить новый товар </h3>
      <input
        className="control-add"
        type="button"
        value={visibleAdd ? '-' : '+'}
        onClick={() => setVisibleAdd(!visibleAdd)}
      />
    </span>
  );
}

export default function ProductAdminPage() {
  const [visibleAdd, setVisibleAdd] = useState(false);

  const [products, loading, error] = useProductFetch();

  return (
    <div>
      <Control visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />

      <ProductAdd visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />

      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
}

/*

components
- ui
- products
- - admin
- - menu
- header

page
- admin-pages


- menu
-- product list

- admin
-- product list


js
- переменные
- массивы (основы)
- циклы (основы)
- Асинхронность
C#
- переменные
- массивы
- циклы
- LINQ




Tag: 
основы



*/
