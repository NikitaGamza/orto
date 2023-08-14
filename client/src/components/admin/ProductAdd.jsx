import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Input from './Input';
import ModalWindow from './ModalWindow/ModalWindow';
import InputFile from '../ui/InputFile/InputFile';
import useInputFile from '../ui/InputFile/useInputFile';

export default function ProductAdd(props) {
  const { visibleAdd, setVisibleAdd } = props;

  const [product, setProduct] = useState({});

  const [files, setFiles, onRemoveFile, imageUrls, setImageUrls] =
    useInputFile();

  const addProduct = async (e) => {
    e.preventDefault();

    files.forEach(async (file, index) => {
      const formData = new FormData();

      formData.append('images', file);

      formData.append(
        'names',
        `${product.nameProduct}-${product.articul}-${index}`
      );

      await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      }).catch((error) => console.error(error));
    });

    // const {slug, category, articul, nameProduct, size, color, length, brand, country, description, price} = product

    // const newProduct = {
    //   image: files.map((item, index) => `${nameProduct}-${articul}-${index}`),
    //   name: nameProduct,
    //   slug,
    //   category,
    //   articul,
    //   size,
    //   color: color.split(',').map((i) => i.trim()),
    //   length,
    //   price: Number(price),
    //   brand,
    //   country,
    //   description,
    // };

    const productClone = product;
    productClone.image = files.map(
      (item, index) =>
        `${productClone.nameProduct}-${productClone.articul}-${index}`
    );
    productClone.name = productClone.nameProduct;
    productClone.color = productClone.color.split(',').map((i) => i.trim());
    productClone.price = Number(productClone.price);

    const body = JSON.stringify(productClone);

    try {
      const response = await fetch('/api/products/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await response.json();

      setVisibleAdd(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const Inputs = [
    { title: 'Наименование', propName: 'nameProduct' },
    { title: 'Ссылка', propName: 'slug' },
    { title: 'Категория', propName: 'category' },
    { title: 'Цена', propName: 'price' },
    { title: 'Длинна', propName: 'length' },
    { title: 'Размер', propName: 'size' },
    { title: 'Артикул', propName: 'articul' },
    { title: 'Производитель', propName: 'brand' },
    { title: 'Цвет', propName: 'color' },
    { title: 'Страна', propName: 'country' },
    { title: 'Описание', propName: 'description' },
  ];

  return (
    <ModalWindow isVisible={visibleAdd} setIsVisible={setVisibleAdd}>
      <div>
        <InputFile
          value={files}
          setFiles={setFiles}
          onRemove={onRemoveFile}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />
        {Inputs.map((i) => (
          <Input
            title={i.title}
            setProduct={setProduct}
            product={product}
            propName={i.propName}
          />
        ))}

        <Button type="submit" onClick={(e) => addProduct(e)}>
          Добавить
        </Button>
        <Button type="button" onClick={() => setVisibleAdd(false)}>
          Отменить
        </Button>
      </div>
    </ModalWindow>
  );
}
