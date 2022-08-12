import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import AlertBanner from '../../common/AlertBanner';
import { useOrderDetailsContext } from '../../context/OrderDetailsContext';

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [,,,,, resetTheAllItems] = useOrderDetailsContext();
  const getOrder = () => {
    axios.post('http://localhost:3030/order', { name: 'mustafa' })
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleTheOrder = () => {
    setOrderPhase('inProgress');
    resetTheAllItems();
  };

  if (error) {
    return <AlertBanner />;
  }

  if (orderNumber) {
    return (
      <div>
        <h1>thank you!</h1>
        <h3>your order number is {orderNumber} </h3>
        <p>as per our terms and conditions nothing will happen now</p>
        <Button onClick={handleTheOrder}>Create New Order</Button>
      </div>
    );
  }
  return (
    <h3>loading...</h3>
  );
}

export default OrderConfirmation;
