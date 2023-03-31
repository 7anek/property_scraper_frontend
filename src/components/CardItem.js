import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export default function CardItem(props) {
    // console.log("aaaa");
    // console.log(props);
    return (    
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                component="img"
                sx={{
                    height: "150px"
                    // 16:9
                    // pt: '56.25%',
                }}
                image={props.item.main_image_url}
                alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.item.title}
                </Typography>
                <Typography>
                    {props.item.service} / {props.item.area} / {props.item.price} / {props.item.price_per_square_meter}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">View</Button>
                </CardActions>
            </Card>
    );
}