import React from 'react';
import { useContext } from 'react';
import { Store } from '../../Store';

export default function PaymentPage() {
  console.log(localStorage.getItem('cartItems'));
  console.log(localStorage.getItem('userInfo'));
  console.log(localStorage.getItem('shippingAddress'));
  // const order = localStorage.getItem('cartItems');
  console.log(Array.isArray([1, 2, 3]));
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
