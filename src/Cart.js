import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './ItemComponents/CartItem'
import { useGlobal } from './GlobalContext';
import qs from 'qs';
import Post from './Backend'


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import { ConstructionOutlined } from '@mui/icons-material';

function ShoppingList(itemAdded) {
  const { globalState, setGlobalState } = useGlobal();

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);


  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }


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

  const placeOrder = async () => {
    /*try {
      const response = await axios.post('http://localhost:5001/api/shoppingcart/order', null, { withCredentials: true });
      console.log("Placing order");
      console.log(response);
      setItems([]);
      setTotal(0)
    } catch (error) {
      console.log("Failed to place order");
      console.log(error);
    }*/
    Post('shoppingcart/order').then(responseData => {
      setItems([]);
      setTotal(0)
    })
  }

  const clearCart = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/shoppingcart/clear', null, { withCredentials: true });
      console.log("Placing order");
      console.log(response);
      setItems([]);
      setTotal(0)
    } catch (error) {
      console.log("Failed to place order");
      console.log(error);
    }
  }

  return (
    <main>
      <h1>Shopping cart</h1>
      <Box sx={{ flexGrow: 1, paddingRight: '25%', paddingLeft: '25%' }}>
        <List dense={5}>
          {items.map((item) => (

            <ListItem key={item._id} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => itemClicked(item._id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <CartItem item={item} />
            </ListItem>
          ))}
        </List>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Total: {total}
        </Typography>
        <Button variant="contained" onClick={() => clearCart()}>Clear cart</Button>
        <Button variant="contained" onClick={() => placeOrder()}>Place order</Button>
      </Box>
    </main>
  );
}

export default ShoppingList;