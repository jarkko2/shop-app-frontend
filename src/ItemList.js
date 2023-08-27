import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopItem from './ShopItem'
import { useGlobal } from './GlobalContext';

function ItemList() {
  const [items, setItems] = useState([]);
  const { globalState, setGlobalState } = useGlobal();

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
      setGlobalState(true)
    } catch (error) {
      console.error('Error adding item to cart:', error.response);
    }
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map(item => (
          <div>
            <ShopItem item={item}/>
            <button className="shop-button" onClick={() => itemClicked(item._id)}>Add</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;