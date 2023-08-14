import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import './ProductAdminPage.scss';
import ProductList from '../../products/admin/ProductList';
import useProductFetch from '../../products/useProductFetch';
import ProductAdd from '../../products/admin/ProductAdd';
import Control from '../../ui/Control';
import ModalEdit from '../../products/admin/ModalEdit';
import { Store } from '../../../Store';

export default function ProductAdminPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [visibleAdd, setVisibleAdd] = useState(false);

  const [products, loading, error, onUpdateList] = useProductFetch();

  const onSetIsVisibleEditModal = (value) => {
    ctxDispatch({
      type: 'TOGGLE_EDIT_MODAL',
      payload: value,
    });
  };

  return (
    <div>
      <Control visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />

      <ProductAdd
        visibleAdd={visibleAdd}
        setVisibleAdd={setVisibleAdd}
        onUpdateList={onUpdateList}
      />

      <ModalEdit
        isModalVisible={state.product.isVisibleEditModal}
        setIsModalVisible={onSetIsVisibleEditModal}
        updateList={onUpdateList}
      />

      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
}
