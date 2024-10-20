"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CartItem from "../../components/CartItem";
import CartSummary from "../../components/CartSummary";
import OrderForm from "../../components/OrderForm";
import { useCart } from "../../context/CartContext";
import { Contact } from "../../types";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const router = useRouter();

  // Modifiez cette fonction pour accepter l'ID et la couleur
  const handleRemove = (id: string, color: string) => {
    console.log("ID à retirer :", id, " Couleur :", color);
    removeFromCart(id, color); // Passe à removeFromCart l'ID et la couleur
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const product = cart.find((item) => item._id === id);
    if (product) {
      addToCart({ ...product, quantity: delta });
    }
  };

  const handleOrder = (contact: Contact) => {
    const productIds = cart.map((item) => item._id);

    if (!isContactValid(contact)) {
      alert("Veuillez vérifier vos informations de contact.");
      return;
    }

    if (!isProductIdsValid(productIds)) {
      alert("Les IDs des produits sont invalides.");
      return;
    }

    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, products: productIds }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse API complète:", data);
        const orderId = data.orderId;

        if (orderId) {
          const products = JSON.stringify(cart); // Convertir les produits en JSON pour les passer à la page de confirmation

          clearCart(); // Vide le panier local après la commande réussie

          // Redirection vers la page de confirmation avec les détails de la commande
          router.push(
            `/confirmation?orderId=${orderId}&total=${calculateTotal()}&products=${encodeURIComponent(
              products
            )}`
          );
        } else {
          console.error("Erreur: ID de commande manquant dans la réponse");
          alert(
            "Une erreur est survenue lors du traitement de votre commande."
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la commande:", error);
        alert("Une erreur est survenue lors de la commande.");
      });
  };

  const isContactValid = (contact: Contact) => {
    return (
      contact.firstName.trim() !== "" &&
      contact.lastName.trim() !== "" &&
      contact.address.trim() !== "" &&
      contact.city.trim() !== "" &&
      /\S+@\S+\.\S+/.test(contact.email)
    );
  };

  const isProductIdsValid = (productIds: string[]) => {
    return (
      Array.isArray(productIds) &&
      productIds.length > 0 &&
      productIds.every((id) => typeof id === "string")
    );
  };

  const calculateTotal = () =>
    cart.reduce(
      (total, item) => total + (item.price * (item.quantity || 1)) / 100,
      0
    );

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Mon panier
      </Typography>
      {cart.length === 0 ? (
        <Typography>Votre panier est vide</Typography>
      ) : (
        <Box>
          {cart.map((item) => (
            <CartItem
              key={item._id + item.color} // Utilisation de l'id et la couleur pour générer une clé unique
              item={item}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
          <CartSummary cart={cart} />
          <OrderForm onSubmit={handleOrder} />
        </Box>
      )}
    </Box>
  );
}
