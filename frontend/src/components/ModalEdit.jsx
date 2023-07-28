import React, { useState } from 'react';

export default function ModalEdit(props) {
  const { isVisisble, setIsVisible, id } = props;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [articul, setArticul] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [length, setLength] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  const updateProduct = async (isName) => {
    const updatedProduct = {
      name: isName,
      slug,
      category,
      articul,
      size,
      color,
      length,
      price: Number(price),
      brand,
      country,
      description,
    };

    const body = JSON.stringify(updatedProduct);
    try {
      const response = await fetch('/api/products/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!isVisisble && !id) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <p>Имя товара</p>
        <input type="text" />
        <p>Размер</p>
        <input type="text" />
        <p>Длинна</p>
        <input type="text" />
        <p>Артикул</p>
        <input type="text" />
        <p>Цвет</p>
        <input type="text" />
        <p>Цена</p>
        <input type="text" />
        <p>Производитель</p>
        <input type="text" />
        <p>Страна</p>
        <input type="text" />
        <p>Описание</p>
        <input type="text" />
        <p>Ссылка</p>
        <input type="text" />
        <input
          type="button"
          value="Обновить"
          onClick={() => updateProduct(id)}
        />
        <input
          type="button"
          value="Отмена"
          onClick={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
}
