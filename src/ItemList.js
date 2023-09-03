import React, { useState, useEffect } from 'react';
import ShopItem from './ItemComponents/ShopItem'
import Post, { Get } from './Backend'
import CategoryItem from './ItemComponents/CategoryItem';

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

function ItemList() {
  const defaultTheme = createTheme();

  // All items, should not use anywhere than to store original state
  const [items, setItems] = useState([]);

  // Sorted items, can be modified
  const [sortedItems, setSortedItems] = useState([]);

  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortByCategory, setSortByCategory] = useState("")
  const [categories, setCategories] = useState([])

  const email = useSelector((state) => state.email)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

  }, [sortByPrice]);

  const fetchData = async () => {
    Get('items').then(responseData => {
      setItems(responseData.items)
      setSortedItems(responseData.items)
      let differentCategories = []
      responseData.items.map((item) => {
        if (!differentCategories.some((category) => category === item.category)) {
          differentCategories = [...differentCategories, item.category]
        }
      })
      differentCategories = [...differentCategories, "all"]
      console.log(differentCategories)
      setCategories(differentCategories)
      console.log(categories)
    })
  };

  const itemClicked = async (id) => {
    Post('shoppingcart', { itemId: id }).then(responseData => {
      console.log("Added " + responseData.item)
    })
  };

  const addToCartVisibility = email ? 'block' : 'none';

  const handleSortByPrice = () => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortByPrice) {
        return b.price - a.price; // Sort in descending order by price
      } else {
        return a.price - b.price; // Sort in ascending order by price
      }
    });
    setItems(sortedItems)
    setSortByPrice(!sortByPrice)
  }

  const handleCategorySort = (name) => {
    if (name === "all") {
      setSortedItems(items);
    } else {
      const filteredItems = items.filter((item) => item.category === name);
      setSortedItems(filteredItems);
    }
    setSortByCategory(name);
  };
  

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Container sx={{ py: 4 }} maxWidth="lg">
            <Button onClick={() => handleSortByPrice()}>Sort by price</Button>

            {categories.map((item) => (
                <CategoryItem item={item} onCategorySort={handleCategorySort}></CategoryItem>
            ))}

            <Grid container spacing={3}>
              {sortedItems.map((item) => (
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