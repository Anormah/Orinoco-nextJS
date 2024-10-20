// src/components/ProductCard.tsx
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          {product.price / 100} €{" "}
          {/* Division par 100 pour afficher le prix en euros */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          component={Link}
          href={`/product/${product._id}`} // Utilisation de _id ici
          size="small"
          sx={{ textTransform: "none" }}
        >
          Voir le produit
        </Button>
      </CardActions>
    </Card>
  );
}
