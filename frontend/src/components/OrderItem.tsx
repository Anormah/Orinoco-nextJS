import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../types";

interface OrderItemProps {
  item: Product & { color: string; quantity: number };
}

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        padding: 2,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          image={item.imageUrl}
          alt={item.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 4,
            marginRight: 2,
          }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography>Quantité: {item.quantity}</Typography>
          <Typography>Prix: {(item.price / 100) * item.quantity} €</Typography>
          <Typography>Couleur: {item.color}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
