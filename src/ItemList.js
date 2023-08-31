import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopItem from './ItemComponents/ShopItem'
import { useGlobal } from './GlobalContext';


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

function ItemList() {
  const defaultTheme = createTheme();

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
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 4 }} maxWidth="lg">
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
                    <Button size="small" onClick={() => itemClicked(item._id)} key={Math.random()}>Add to cart</Button>
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