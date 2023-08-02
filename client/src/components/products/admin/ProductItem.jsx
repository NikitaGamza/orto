import React from 'react';

export default function ProductItem(props) {
  const { product, setModalVisible, setProductId } = props;

  const onEdit = () => {
    setModalVisible(true);
    setProductId(product._id);
  };

  const onRemove = (id) => {};

  return (
    <div className="control-wrap">
      <div className="control-row">
        <img
          src={`http://localhost:5000/static/images/products/${product.image[0]}.jpg`}
          alt=""
          srcset=""
          className="control-img"
        />

        <div>
          <div>{product.name}</div>
          {product.size && <div>Размер: {product.size} </div>}
          {product.length && <div>Длинна: {product.length}</div>}
          <div>Цена: {product.price} руб</div>
          <div>Производитель: {product.brand}</div>
          <div>Страна: {product.country}</div>
          <div>Описание: {product.description}</div>
          <div>Ссылка: {product.slug}</div>
          <div>Артикул: {product.articul}</div>
        </div>

        <div>
          <input
            className="control-edit"
            type="button"
            value="Редактировать"
            onClick={onEdit}
          />

          <input
            onClick={() => onRemove(product._id)}
            className="control-edit"
            type="button"
            value="Удалить"
          />
        </div>
      </div>
    </div>
  );
}
