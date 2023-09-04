import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Post, { Get } from './Backend'

// Material UI
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ItemList from './ItemList'

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        console.log("Set mobile drawer " + !mobileOpen)
        setMobileOpen(!mobileOpen);
    };
    const handleDrawerSet = (state) => {
        console.log("Set mobile drawer " + state)
        setMobileOpen(state);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    // All items, should not use anywhere than to store original state
    const [items, setItems] = useState([]);

    // Sorted items, can be modified
    const [sortedItems, setSortedItems] = useState([]);

    const [sortByPrice, setSortByPrice] = useState(false)
    const [sortByCategory, setSortByCategory] = useState("")
    const [categories, setCategories] = useState([])

    //const email = useSelector((state) => state.email)

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

    }, [sortByPrice]);

    const fetchData = async () => {
        Get('items').then(responseData => {
            setItems(responseData.items)
            setSortedItems(responseData.items)
            console.log("Got info")
            const differentCategories = SearchAllDifferentCategories(responseData.items)
            console.log(differentCategories)
            setCategories(differentCategories)
            console.log(categories)
        })
    };

    function SearchAllDifferentCategories(items) {
        let differentCategories = ["all"]
        items.map((item) => {
            if (!differentCategories.some((category) => category === item.category)) {
                differentCategories = [...differentCategories, item.category]
            }
        })
        return differentCategories
    }

    const itemClicked = async (id) => {
        Post('shoppingcart', { itemId: id }).then(responseData => {
            console.log("Added " + responseData.item)
        })
    };

    //const addToCartVisibility = email ? 'block' : 'none';

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
        handleDrawerSet(false)
        if (name === "all") {
            setSortedItems(items);
        } else {
            const filteredItems = items.filter((item) => item.category === name);
            setSortedItems(filteredItems);
        }
        setSortByCategory(name);
        console.log("Gonna sort by " + name)
    };

    const drawer = (
        <div>
            <Toolbar />

            <Divider />
            <List>
                {categories.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleCategorySort(text)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <ItemList items={sortedItems} />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;