"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import OrderItem from "../../components/OrderItem"; // Importez le nouveau composant OrderItem

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const total = searchParams.get("total");

  // Récupération des produits commandés
  const products = JSON.parse(searchParams.get("products") || "[]"); // Parse le tableau des produits

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Merci pour votre commande !
      </Typography>
      <Typography variant="h6">Identifiant de commande : {orderId}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Montant total : {total} €
      </Typography>
      <Typography sx={{ mt: 4 }}>
        Votre commande a bien été prise en compte. Vous recevrez un email de
        confirmation sous peu.
      </Typography>

      {/* Affichage des produits commandés */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2">
          Détails des produits commandés :
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {products.map((product: any) => (
            <Grid item xs={12} key={product._id + product.color}>
              <OrderItem item={product} />{" "}
              {/* Utilisation du composant OrderItem */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
