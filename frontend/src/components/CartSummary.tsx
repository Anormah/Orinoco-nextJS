// src/components/CartSummary.tsx
import { Box, Typography } from "@mui/material";
import { Product } from "../types";

interface CartSummaryProps {
  cart: Product[];
}

export default function CartSummary({ cart }: CartSummaryProps) {
  // Calcule le total du panier
  const calculateTotal = () => {
    // Vérifie si cart est un tableau et non vide
    if (!Array.isArray(cart) || cart.length === 0) {
      return 0; // Retourne 0 si le panier est vide ou non défini
    }

    return cart.reduce(
      (total, item) => total + (item.price * (item.quantity || 1)) / 100,
      0
    ); // Division par 100 pour obtenir le prix en euros
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Résumé de la commande</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: {calculateTotal().toFixed(2)} €{" "}
        {/* Formatage du total à 2 décimales */}
      </Typography>
    </Box>
  );
}
