import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { ActionTypes, Store } from '../../../Store';
import Input from '../Input/Input';
import InputFile from '../../ui/InputFile/InputFile';
import useInputFile from '../../ui/InputFile/useInputFile';
import InputPrice from '../../ui/InputFile/InputPrice';
import InputDropdown from '../InputDropdown/InputDropdown';
import { getProductCategory } from '../../../api/category.js';
import InputGenerator from '../../generator/InputGenerator';
import { InputType } from '../../generator/InputTypes.enum';

export default function ModalEdit(props) {
  const { isModalVisible, setIsModalVisible, updateList, setter } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isVisible, setIsVisible] = useState(true);
  const [category, setCategory] = useState();
  const [files, setFiles, onRemoveFile, imageUrls, setImageUrls] =
    useInputFile();
  const getIsVisibleEditModal = () => state.product.isVisibleEditModal;

  const onCloseModal = () => {
    const action = {
      type: ActionTypes.TOGGLE_EDIT_MODAL,
      payload: state.product.isVisibleEditModal,
    };
    ctxDispatch(action);
  };

  useEffect(() => {
    setIsVisible(!getIsVisibleEditModal());
  }, [state.product.isVisibleEditModal]);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceList, setPriceList] = useState([{ price: 100, size: 10 }]);
  useEffect(() => {
    setProduct({
      ...product,
      prices: priceList.map((item) => ({ price: item.price, size: item.size })),
    });
    // console.log(priceList);
    // console.log(product);
  }, [priceList]);

  useEffect(() => {
    if (product) {
      // setPriceList(product.prices);
      console.log(product);
    }
  }, [product]);

  useEffect(() => {
    const handler = async () => {
      const { data } = await getProductCategory();
      console.log(data);
      setCategory(data);
    };
    handler();
  }, []);

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

      setPriceList(mappedData.prices);

      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log(this);
  }, []);

  const updateProduct = async () => {
    // console.log(files);

    // console.log(
    //   files.map(
    //     (item, index) =>
    //       `${product.nameProduct}-${product.articul}-${
    //         product.image.length + index
    //       }`
    //   )
    // );

    console.log('edited');

    return;

    // const body = {
    //   ...product,
    //   id: undefined,
    //   nameProduct: undefined,
    //   name: product.nameProduct,
    //   color: product.color.split(',').map((i) => i.trim()),
    //   price: Number(product.price),
    //   rating: Number(product.rating),
    //   size: Number(product.size),
    //   // image: product.image.concate(
    //   //   files.map(
    //   //     (item, index) => `${product.nameProduct}-${product.articul}-${index}`
    //   //   )
    //   // ),
    //   image: product.image,
    // };

    // try {
    //   await fetch('/api/products/', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //   });
    // } catch {
    //   console.log('error');
    // }
  };

  useEffect(() => {
    console.log(state.product);
    if (state.product.isVisibleEditModal) {
      console.log(state.product.editProductId);
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
    { title: 'Наименование', propName: 'nameProduct', type: InputType.text },
    { title: 'Ссылка', propName: 'slug', type: InputType.text },
    { title: 'Длинна', propName: 'length', type: InputType.text },
    { title: 'Артикул', propName: 'articul', type: InputType.text },
    { title: 'Производитель', propName: 'brand', type: InputType.text },
    { title: 'Цвет', propName: 'color', type: InputType.text },
    { title: 'Страна', propName: 'country', type: InputType.text },
    { title: 'Описание', propName: 'description', type: InputType.textarea },
  ];
  const onEdit = () => {
    updateProduct();

    // ctxDispatch({
    //   type: ActionTypes.TOGGLE_EDIT_MODAL,
    //   payload: false,
    // });

    ctxDispatch({ type: ActionTypes.UPDATE_LIST_START });
    setIsModalVisible(false);
  };

  return (
    <>
      <ModalWindow
        isVisible={state.product.isVisibleEditModal}
        setIsVisible={setIsModalVisible}
      >
        <h1>Редактирование</h1>

        <InputFile
          files={files}
          setFiles={setFiles}
          onRemove={onRemoveFile}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />

        {Inputs.map((i) => {
          return (
            <InputGenerator
              title={i.title}
              setter={setProduct}
              getter={product}
              product={product}
              propName={i.propName}
              type={i.type}
            />
          );
        })}
        <InputPrice priceList={priceList} setPriceList={setPriceList} />
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
