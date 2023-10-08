import React, { useContext, useEffect, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Store } from '../../../Store';
import { ActionTypes } from '../../../ActionTypes/ActionTypes';
import InputFile from '../../ui/InputFile/InputFile';
import useInputFile from '../../ui/InputFile/useInputFile';
import InputPrice from '../../ui/InputFile/InputPrice';
import { getProductCategory } from '../../../api/category.js';
import InputGenerator from '../../generator/InputGenerator';
import { InputType } from '../../generator/InputTypes.enum';
import { uploadFile, updateFiles } from '../../../api/product';

export default function ModalEdit(props) {
  const { setIsModalVisible } = props;

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
  }, [priceList]);

  useEffect(() => {
    const handler = async () => {
      const { data } = await getProductCategory();
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
      alert(error.message);
    }
  };

  //эксперементальная функция
  const updateImages = async () => {
    const allFiles = [...product.image, ...files];
    const body = {
      _id: product._id,
      image: allFiles,
    };
    await updateFiles(body);
  };

  const updateProduct = async () => {
    //переписать на фор
    for (const file of files) {
      const index = files.indexOf(file);
      // await uploadFile(
      //id,
      //   file,
      //   `${index}`
      // );
      console.log(file);
      // setImageUrls((prevState) => [...prevState, file])
    }
    const productClone = product;
    productClone.image = product.image;
    console.log(product.images);
    console.log(files);

    // return;
    const body = {
      ...product,
      name: product.name,
      color: product.color.split(',').map((i) => i.trim()),
      price: Number(product.price),
      rating: Number(product.rating),
      size: Number(product.size),
      image: productClone.image,
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
      alert('error');
    }
  };

  useEffect(() => {
    if (state.product.isVisibleEditModal) {
      getProductById(state.product.editProductId);
    }
    console.log(product);
  }, [state.product.isVisibleEditModal]);

  const Inputs = [
    { title: 'Наименование', propName: 'name', type: InputType.text },
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
          imageUrls={product.image} //тут было imageUrls
          setImageUrls={setImageUrls}
        />

        {Inputs.map((input, index) => {
          return (
            <InputGenerator
              title={input.title}
              setter={setProduct}
              getter={product}
              product={product}
              propName={input.propName}
              type={input.type}
              key={index}
            />
          );
        })}
        <InputPrice priceList={priceList} setPriceList={setPriceList} />
        <button
          onClick={() => {
            updateImages();
          }}
        >
          Сохранить изменения
        </button>
      </ModalWindow>
    </>
  );
}
