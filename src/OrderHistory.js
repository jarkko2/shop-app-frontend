import React, { useState, useEffect } from 'react';
import ShopItem from './ItemComponents/ShopItem'
import Post, { Get } from './Backend'
import OrderItem from './ItemComponents/OrderItem'

// Material UI
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function OrderHistoryList() {
  const [orders, setOrders] = useState([]);
  const[totalMoney, setTotalMoneyMade] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    Get('orders/history').then(responseData => {
      console.log(responseData)
      setOrders(responseData != false ? responseData.orders : []);
      setTotalMoneyMade(responseData.totalMoneySpent)
    })
  };

  const handleToggleOrderAsCompleted = (id) => {
    console.log(id)
  }

  return (
    <div>
      <h1>Order history</h1>
      <Container sx={{ py: 4 }} maxWidth="lg">
          {orders.map(order => (
            <OrderItem order={order} onHandleToggleButtonClicked={handleToggleOrderAsCompleted} disableSwitch={true} ></OrderItem>
          ))}
        <p>Total money spent: {totalMoney}</p>
      </Container>
    </div>
  );
}

export default OrderHistoryList;