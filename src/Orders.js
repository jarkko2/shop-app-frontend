import React, { useState, useEffect } from 'react';
import ShopItem from './ItemComponents/ShopItem'
import Post, { Get } from './Backend'

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    Get('orders/admin').then(responseData => {
      setOrders(responseData != false ? responseData.orders : []);   
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
            <p>Total: {order.total}</p>
            <p>Completed: {order.completed.toString()}</p>
          </li>


        ))}
      </ul>
    </div>
  );
}

export default OrderList;