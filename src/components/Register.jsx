"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import axios from "axios";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    password: "",
    role: "client",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  
  // Stockez le rôle lorsqu'il change
  if (name === "role") {
    window.sessionStorage.setItem("userRole", value);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      // Console log pour débogage (à garder)
    console.log("Données envoyées:", {
      nom: form.nom,
      email: form.email,
      password: form.password,
      role: form.role
      }); 

      // Envoi des données utilisateur (avec URL photo) au backend
   const response =   await axios.post(
        "https://api-tchop-shap.onrender.com/api/v1/utilisateurs/inscription",
        {
          nom: form.nom,
          email: form.email,
          password: form.password,
          role: form.role,

        }
      );


// Stockez aussi le userId si nécessaire :
if (response.data.userId) {
  window.sessionStorage.setItem("otpUserId", response.data.userId);
}

window.sessionStorage.setItem("otpEmail", form.email);
window.sessionStorage.setItem("userRole", form.role); // <-- Ajouté

navigate("/otp-verification");
} catch (err) {
      // Gestion améliorée des erreurs
      const errorMessage = err.response?.data?.message 
        || "Erreur lors de l'inscription. Veuillez réessayer.";
      
      setError(errorMessage);
      console.error("Erreur d'inscription:", {
        error: err,
        response: err.response?.data
      });
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 10, mb: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Inscription
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Nom complet"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Adresse e‑mail"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Mot de passe"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="role-label">Rôle</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={form.role}
                  label="Rôle"
                  onChange={handleChange}
                >
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="restaurant">Restaurant</MenuItem>
                </Select>
              </FormControl>

              
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                S’inscrire
              </Button>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
  <Typography variant="body2">
    Vous avez déjà un compte ?{' '}
    <Link 
      component={RouterLink} 
      to="/login" 
      sx={{ 
        color: '#FF6B00', 
        fontWeight: 500,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }}
    >
      Connectez-vous
    </Link>
  </Typography>
</Box>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
