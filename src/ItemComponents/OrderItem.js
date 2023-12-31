// Material UI
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider'

import ShopItem from './ShopItem'

export default function OrderItem({ order, onHandleToggleButtonClicked, disableSwitch = false }) {
    const handleToggleOrderAsCompleted = (id) => {
        onHandleToggleButtonClicked(id)
    }

    const itemDetails = {};

    order.items.forEach((item) => {
        const itemName = item.name;
        const itemPrice = item.price;

        if (itemDetails[itemName]) {
            itemDetails[itemName].count++;
            itemDetails[itemName].totalPrice += itemPrice;
        } else {
            itemDetails[itemName] = {
                count: 1,
                totalPrice: itemPrice,
            };
        }
    });


    const duplicateItemsOutput = Object.entries(itemDetails).map(([itemName, details]) => (
        <Typography sx={{ fontSize: 18 }} color="text.primary">
            <div key={itemName}>
                <ShopItem itemName={itemName} details={details} />
            </div>
        </Typography>
    ));

    const card = (
        <Card sx={{ minWidth: 300, margin: 5 }}>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                    {order.owner}
                </Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Items</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{margin:5}}>
                        {duplicateItemsOutput}
                    </AccordionDetails>
                </Accordion>
                <Divider sx={{marginTop:5, marginBottom:2}}/>
                <Typography variant="body2">
                    ID: {order.Id}
                </Typography>
                <Typography variant="body2">
                    <p>Date: {order.date}</p>
                </Typography>
                <Typography variant="body2">
                    <p>Total: {order.total}</p>
                </Typography>
                Completed <Switch checked={order.completed} onClick={() => handleToggleOrderAsCompleted(order.Id)} disabled={disableSwitch} />
            </CardContent>
        </Card>
    );

    return (
        <Grid item xs={6}>
            {card}
        </Grid>
    )
}