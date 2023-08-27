import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList({addItemToCart}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/items/')
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const itemClicked = async (id) => {
    try {   
      const response = await axios.post('http://localhost:5001/api/shoppingcart/', { itemId: id }, {
        withCredentials: true, // Important: Send cookies with the request
      });
      console.log('Item added to cart:', id);
      console.log(response)
      addItemToCart(response.data.updatedCart);
    } catch (error) {
      console.error('Error adding item to cart:', error.response);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <span className="item-text">
            {item.name} | {item.price}€
            </span>
            <button className="shop-button" onClick={() => itemClicked(item._id)}>Add</button>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;