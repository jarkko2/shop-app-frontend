import React, { useState, useEffect } from 'react';
import CartItem from './ItemComponents/CartItem'
import { useGlobal } from './GlobalContext';
import qs from 'qs';
import Post, {Put, Get} from './Backend'

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
    Get('shoppingcart/names').then(responseData => {
      setItems(responseData != false ? responseData.items : [])
      setTotal(responseData != false ? responseData.total : 0)
    })
  };

  const itemClicked = async (id) => {
    Put('shoppingcart', id).then(responseData => {
      setDeleted(true)
    })
  };

  const placeOrder = async () => {
    Post('shoppingcart/order').then(responseData => {
      setItems([]);
      setTotal(0)
    })
  }

  const clearCart = async () => {
    Post('shoppingcart/clear').then(responseData => {
      setItems([]);
      setTotal(0)
    })
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