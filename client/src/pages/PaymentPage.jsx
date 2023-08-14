import React from 'react';
import { useContext } from 'react';
import { Store } from '../Store';

export default function PaymentPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;


  return (
    <div>
      <h3>Ваш заказ успешно оформлен</h3>
      <h6>Детали заказа</h6>
      {cartItems.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
}
