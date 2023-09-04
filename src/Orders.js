import React, { useState, useEffect } from 'react';
import ShopItem from './ItemComponents/ShopItem'
import Post, { Get } from './Backend'

function OrderList() {
  const [orders, setOrders] = useState([]);
  const[totalMoney, setTotalMoneyMade] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    Get('orders/admin').then(responseData => {
      console.log(responseData)
      setOrders(responseData != false ? responseData.orders : []);
      setTotalMoneyMade(responseData.totalMoneyMade)
    })
  };

  return (
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <span className="item-text">
              {order.owner}
            </span>
            {order.items.map(item => (
              <ShopItem item={item} />
            ))}
            <p>Date: {order.date}</p>
            <p>Total: {order.total}</p>
            <p>Completed: {order.completed.toString()}</p>
          </li>
        ))}
      </ul>
      <p>Total money made: {totalMoney}</p>
    </div>
  );
}

export default OrderList;