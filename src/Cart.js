import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './ItemComponents/CartItem'
import { useGlobal } from './GlobalContext';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';

function ShoppingList(itemAdded) {
  const { globalState, setGlobalState } = useGlobal();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    fetchData();
  }, [globalState, isDeleted]);

  useEffect(() => {
    if (isDeleted) {
      setDeleted(false)
    }
  })

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/shoppingcart/names', { withCredentials: true })
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
      const response = await axios.put('http://localhost:5001/api/shoppingcart/' + id, null, { withCredentials: true });
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

      <Container sx={{ py: 6 }} maxWidth="md">
        <Grid item xs={12} md={6}>
          {items.map(item => (
            <List>
              <ListItem>
                <CartItem item={item} />
                <IconButton edge="end" aria-label="delete" onClick={() => itemClicked(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </List>
          ))}
        </Grid>
      </Container>

      <p>Total: {total}</p>
      <Grid item xs={12} md={6}>
            <List dense={3}>

            </List>
        </Grid>
    </div>
  );
}

export default ShoppingList;