import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopItem from './ShopItem'
import { useGlobal } from './GlobalContext';

function ShoppingList(itemAdded) {
  const { globalState, setGlobalState } = useGlobal();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    fetchData();
  }, [globalState, isDeleted]);

  useEffect(() => {
    if (isDeleted){
        setDeleted(false)
    }
  })
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/shoppingcart/names', {withCredentials: true})
      console.log("shopping cart")
      console.log(response.data.items)
      setItems(response.data.items);
      setTotal(response.data.total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const itemClicked = async (id) => {
    try {   
      const response = await axios.put('http://localhost:5001/api/shoppingcart/'+ id, null, {withCredentials: true});
      console.log('Item removed from cart:', id);
      console.log(response)
      setDeleted(true)
    } catch (error) {
      console.error('Error removing item to cart:', error.response);
    }
  };

  return (
    <div>
      <h1>Shopping cart</h1>
      <ul className="shop-cart">
        {items.map(item => (
            <div>
              <ShopItem item={item}/>
              <button className="shop-button" onClick={() => itemClicked(item._id)}>Delete</button>
            </div>
          
        ))} 
      </ul>
      <p>Total: {total}</p>
    </div>
  );
}

export default ShoppingList;