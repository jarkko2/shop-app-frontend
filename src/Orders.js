import React, { useState, useEffect } from 'react';
import Post, { Get } from './Backend'
import OrderItem from './ItemComponents/OrderItem'
import Button from '@mui/material/Button';

// Material UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [totalMoney, setTotalMoneyMade] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    Get('orders/admin').then(responseData => {
      console.log("Orders")
      console.log(responseData.orders)
      setOrders(responseData != false ? responseData.orders : []);
      setTotalMoneyMade(responseData.totalMoneyMade)
    })
  };

  const handleToggleOrderAsCompleted = (id) => {
    console.log(id)
    Post('orders/admin/' + id).then(() => {
      fetchData();
    })
  }

  const handleToggleAllOrdersAsCompleted = () => {
    Post('orders/admin').then(() => {
      console.log("Toggled all orders as completed")
      fetchData();
    })

  }

  return (
    <div>
      <h1>Order List</h1>
      <Button variant="contained" color="warning" onClick={() => handleToggleAllOrdersAsCompleted()}>Toggle all as completed</Button>
      <Container sx={{ py: 4 }} maxWidth="lg">
          {orders.map(order => (
            <OrderItem order={order} onHandleToggleButtonClicked={handleToggleOrderAsCompleted}></OrderItem>
          ))}
        <p>Total money made: {totalMoney}</p>
      </Container>
    </div>
  );
}

export default OrderList;