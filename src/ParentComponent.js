import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import Cart from './Cart';

function ParentComponent() {
  const [itemAdded, setItemAdded] = useState(false);

  const addItemToCart = () => {
    setItemAdded(true);
  };

  useEffect(() => {
    if (itemAdded){
        setItemAdded(false)
    }
  })

  return (
    <div>
        <Cart itemAdded={itemAdded} />
        <ItemList addItemToCart={addItemToCart} />
    </div>
  );
}

export default ParentComponent;
