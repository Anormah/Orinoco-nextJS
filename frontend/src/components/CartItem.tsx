import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Product } from "../types";

interface CartItemProps {
  item: Product & { color: string; quantity: number };
  onRemove: (id: string, color: string) => void; // Ajout de la couleur
  onUpdateQuantity: (id: string, delta: number) => void;
}

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
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
        <Link href={`/product/${item._id}`} passHref>
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
              cursor: "pointer",
            }}
          />
        </Link>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography>Quantité: {item.quantity}</Typography>
          <Typography>Prix: {(item.price / 100) * item.quantity} €</Typography>
          <Typography>Couleur: {item.color}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {/* Affichage de l'icône poubelle si la quantité est 1, sinon le bouton "-" */}
            {item.quantity === 1 ? (
              <IconButton
                onClick={() => onRemove(item._id, item.color)} // Passe l'id et la couleur
                color="secondary"
                aria-label="supprimer"
                sx={{
                  height: 40,
                  width: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Delete />
              </IconButton>
            ) : (
              <Button
                onClick={() => onUpdateQuantity(item._id, -1)}
                sx={{
                  minWidth: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                -
              </Button>
            )}
            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
            <Button
              onClick={() => onUpdateQuantity(item._id, 1)}
              sx={{
                minWidth: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              +
            </Button>
          </Box>
        </CardContent>
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => onRemove(item._id, item.color)} // Passe l'id et la couleur
        sx={{
          height: "fit-content",
          borderRadius: 2,
          textTransform: "none",
        }}
      >
        Retirer
      </Button>
    </Card>
  );
}
