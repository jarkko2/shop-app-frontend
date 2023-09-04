import React, { useState, useEffect } from 'react';
import ShopItem from './ItemComponents/ShopItem'
import Post, { Get } from './Backend'
import Button from '@mui/material/Button';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const[totalMoney, setTotalMoneyMade] = useState([]);

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

  const handleToggleOrderAsCompleted = (id) =>
  {
    console.log(id)
    Post('orders/admin/' + id).then(() => {
      fetchData();
    })
  }

  const handleToggleAllOrdersAsCompleted = () => 
  {
     Post('orders/admin').then(() => {
        console.log("Toggled all orders as completed")
        fetchData();
     })
     
  }

  return (
    <div>
      <h1>Order List</h1>
      <Button variant="contained" onClick={() => handleToggleAllOrdersAsCompleted()}>Toggle all as completed</Button>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <span className="item-text">
              Customer: {order.owner}
            </span>
            {order.items.map(item => (
              <ShopItem item={item} />
            ))}
            <p>ID: {order.Id}</p>
            <p>Date: {order.date}</p>
            <p>Total: {order.total}</p>
            <p>Completed: {order.completed.toString()}</p>
            <Button variant="contained" onClick={() => handleToggleOrderAsCompleted(order.Id)}>Toggle as {(!order.completed).toString()}</Button>
          </li>
        ))}
      </ul>
      <p>Total money made: {totalMoney}</p>
    </div>
  );
}

export default OrderList;