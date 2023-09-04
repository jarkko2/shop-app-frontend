import React, { useState, useEffect } from 'react';
import ShopItem from './ItemComponents/ShopItem'
import Post, { Get } from './Backend'

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

  return (
    <div>
      <h1>Order history</h1>
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

export default OrderHistoryList;