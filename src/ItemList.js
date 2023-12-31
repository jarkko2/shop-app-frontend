import React, { useState, useEffect } from 'react';
import ShopItem from './ItemComponents/ShopItem'
import Post, { Get } from './Backend'

// Material UI
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useSelector } from "react-redux";

function ItemList({items}) {
  const defaultTheme = createTheme();
  const email = useSelector((state) => state.email)
  const itemClicked = async (id) => {
    Post('shoppingcart', { itemId: id }).then(responseData => {
      console.log("Added " + responseData.item)
    })
  };

  const addToCartVisibility = email ? 'block' : 'none';

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <main>
          <Container sx={{ py: 1 }} maxWidth="lg">
            <Grid container spacing={3}>
              {items.map((item) => (
                <Grid item key={item} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography>
                        {item.price}€
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => itemClicked(item._id)} key={Math.random()} sx={{ display: addToCartVisibility }}>Add to cart</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default ItemList;