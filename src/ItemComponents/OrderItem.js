// Material UI
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ShopItem from './ShopItem'

export default function OrderItem({ order, onHandleToggleButtonClicked }) {
    const handleToggleOrderAsCompleted = (id) => {
        onHandleToggleButtonClicked(id)
    }

    const card = (
        <Card sx={{ minWidth: 300, margin: 5}}>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                    {order.owner}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {order.items.map(item => (
                        <ShopItem item={item} />
                    ))}
                </Typography>
                <Typography variant="body2">
                    ID: {order.Id}
                </Typography>
                <Typography variant="body2">
                    <p>Date: {order.date}</p>
                </Typography>
                <Typography variant="body2">
                    <p>Total: {order.total}</p>
                </Typography>
                Completed <Switch checked={order.completed} onClick={() => handleToggleOrderAsCompleted(order.Id)} />
            </CardContent>
        </Card>
    );

    return (
        <Grid item xs={6}>
            {card}
        </Grid>
    )
}