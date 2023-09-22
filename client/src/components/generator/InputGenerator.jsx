import React from 'react';
import { InputType } from './InputTypes.enum';
import Input from '../admin/Input';
import InputTextarea from '../admin/InputTextarea';

export default function InputGenerator(props) {
  const { title, propName, type, getter, setter, product } = props;

  const setterOverwrited = (propName, value) => {
    setter((prevValue) => ({ ...prevValue, [propName]: value }));
  };

  switch (type) {
    case InputType.text:
      return (
        // ТУТ ОШИБКА
        <Input
          title={title}
          product={product}
          setProduct={setterOverwrited}
          propName={propName}
        />
      );
    case InputType.textarea:
      return (
        <InputTextarea
          title={title}
          getter={getter}
          setter={setterOverwrited}
          propName={propName}
        />
      );
  }

  return <div></div>;
}
