import React, { useEffect, useState } from 'react';

export default function OrderItem(item) {
  const [orderItem, setOrderItem] = useState(item);
  //   useEffect(() => {
  //     setOrderItem(item);
  //     console.log(orderItem);
  //   }, []);
  console.log(orderItem);
  return (
    <div>
      <span>{orderItem.clientFIO}</span>
      {/* <span>hi</span> */}
      {/* <span>{orderItem.clientCountry}</span>
      <span>{orderItem.clientCity}</span>
      <span>{orderItem.clientAddress}</span>
      <span>{orderItem.clientPostalCode}</span> */}
    </div>
  );
}
