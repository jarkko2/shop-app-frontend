import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded',
    // Other headers you want to include
  };

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/orders/admin', {withCredentials: true})
        console.log("orders")
        console.log(response.data.orders)
        setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
            <li key={item._id}>
              <span className="item-text">
              {item.name}
              </span>
            </li>
            ))}
        </li>
            
          
        ))}
      </ul>
    </div>
  );
}

export default OrderList;