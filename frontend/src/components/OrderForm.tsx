// src/components/OrderForm.tsx
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Contact } from "../types";

interface OrderFormProps {
  onSubmit: (contact: Contact) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [contact, setContact] = useState<Contact>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(contact);
      }}
      sx={{ mt: 3 }}
    >
      <TextField
        label="Prénom"
        name="firstName"
        value={contact.firstName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Nom"
        name="lastName"
        value={contact.lastName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Adresse"
        name="address"
        value={contact.address}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Ville"
        name="city"
        value={contact.city}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={contact.email}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Passer la commande
      </Button>
    </Box>
  );
}
