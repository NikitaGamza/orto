import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Input from './Input';

export default function ProductAdd(props) {
  const { visibleAdd, setVisibleAdd } = props;

  const [files, setFiles] = useState([]);

  const [product, setProduct] = useState({});
  const imageRef = useRef(null);

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
    productClone.files = files.map(
      (item, index) => `${item.nameProduct}-${item.articul}-${index}`
    );
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
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!visibleAdd) {
    return null;
  }

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

  const onChangeFileInput = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      // console.log(URL.createObjectURL(file));
      const fileReader = new FileReader();
      console.log(fileReader.readAsDataURL(file));

      imageRef.src = URL.createObjectURL(file);

      setFiles((prevValue) => [...prevValue, file]);
    }
  };

  return (
    <>
      <Form onSubmit={(e) => addProduct(e)}>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Картинки</Form.Label>
          <input type="file" multiple onChange={onChangeFileInput} />

          <img src="" alt="" ref={imageRef} />
        </Form.Group>

        {Inputs.map((i) => (
          <Input
            title={i.title}
            setProduct={setProduct}
            propName={i.propName}
          />
        ))}

        <Button type="submit">Добавить</Button>
      </Form>
    </>
  );
}
