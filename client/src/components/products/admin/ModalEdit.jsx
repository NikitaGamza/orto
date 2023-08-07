import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ModalWindow from '../../ui/ModalWindow';
import { Store } from '../../../Store';
import Input from '../../ui/Input';
import InputFile from '../../ui/InputFile/InputFile';
import useInputFile from '../../ui/InputFile/useInputFile';

export default function ModalEdit(props) {
  const { isModalVisible, setIsModalVisible, updateList } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isVisible, setIsVisible] = useState(true);

  const [files, setFiles, onRemoveFile, imageUrls, setImageUrls] =
    useInputFile();

  const getIsVisibleEditModal = () => state.product.isVisibleEditModal;

  const onCloseModal = () => {
    const action = {
      type: 'TOGGLE_EDIT_MODAL',
      payload: state.product.isVisibleEditModal,
    };
    ctxDispatch(action);
  };

  useEffect(() => {
    setIsVisible(!getIsVisibleEditModal());
  }, [state.product.isVisibleEditModal]);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProductById = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const mappedData = {
        ...data,
        nameProduct: data.name,
        color: data.color.join(', '),
        id: data._id,
      };
      setProduct(mappedData);

      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateProduct = async () => {
    const body = {
      ...product,
      id: undefined,
      nameProduct: undefined,
      name: product.nameProduct,
      color: product.color.split(',').map((i) => i.trim()),
      price: Number(product.price),
      rating: Number(product.rating),
      size: Number(product.size),
      image: product.image.concate(
        files.map(
          (item, index) => `${product.nameProduct}-${product.articul}-${index}`
        )
      ),
    };

    try {
      await fetch('/api/products/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    if (state.product.isVisibleEditModal) {
      getProductById(state.product.editProductId);
    }
  }, [state.product.isVisibleEditModal]);

  useEffect(() => {
    if (!isLoading) {
      setImageUrls(
        product.image.map(
          (i) => `http://localhost:5000/static/images/products/${i}.jpg`
        )
      );
    }
  }, [isLoading]);

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

  const onEdit = () => {
    updateProduct();

    ctxDispatch({
      type: 'TOGGLE_EDIT_MODAL',
      payload: false,
    });

    updateList();
  };

  return (
    <>
      <ModalWindow
        isVisible={state.product.isVisibleEditModal}
        setIsVisible={setIsModalVisible}
      >
        <h1>Редактирование</h1>

        <button
          onClick={() => {
            console.log(product);
          }}
        >
          1
        </button>

        <InputFile
          files={files}
          setFiles={setFiles}
          onRemove={onRemoveFile}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />

        {Inputs.map((i) => (
          <Input
            title={i.title}
            product={product}
            setProduct={setProduct}
            propName={i.propName}
          />
        ))}

        <button
          onClick={() => {
            onEdit();
          }}
        >
          +
        </button>
      </ModalWindow>
    </>
  );
}
