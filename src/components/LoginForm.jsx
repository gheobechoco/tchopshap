"use client";

import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
  Paper,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // On utilise la route CORRECTE : "/utilisateurs/connexion"
      const res = await axios.post(
        "https://api-tchop-shap.onrender.com/api/v1/utilisateurs/connexion",
        {
          email: form.email,
          password: form.password,
        }
      );

      // On suppose que la réponse ressemble à :
      // {
      //   message: "...",
      //   token: "...",
      //   utilisateur: {
      //     id: 123,
      //     nom: "...",
      //     email: "...",
      //     role: "client"     // ou "restaurant"
      //   }
      // }

      // (1) Si vous voulez stocker le token pour les appels suivants :
      if (res.data.token) {
        window.localStorage.setItem("token", res.data.token);
      }

      // (2) On récupère le rôle de l’utilisateur
      const role = res.data.utilisateur?.role;
      console.log("🔐 Login réussi – rôle :", role);

      // (3) On redirige suivant le rôle
      if (role === "restaurant") {
        navigate("/admin");
      } else {
        // Par défaut, si role ≠ "restaurant", on envoie vers l'accueil
        navigate("/");
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
      // Récupère le message d’erreur envoyé par l’API ou un message générique
      const msgErreur =
        err.response?.data?.message || "Email ou mot de passe incorrect.";
      setError(msgErreur);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "#f8f9fa", py: 9, border: "1px solid #333" }}>
        <Container sx={{ my: 4 }}>
          <Box sx={{ maxWidth: 500, mx: "auto", border: "1px solid #333", borderRadius: 1 }}>
            <Card sx={{ boxShadow: "0 2px 10px rgba(0,0,0,0.08)", borderRadius: 1 }}>
              <CardContent sx={{ py: 4 }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Connexion
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                  Connectez-vous pour accéder à votre compte
                </Typography>

                <Paper sx={{ bgcolor: "#f0f7ff", p: 2, mb: 3, mx: 1, borderRadius: 1 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "blue", mb: 1 }}>
                      Info démo :
                    </Typography>
                    <Typography variant="body2" sx={{ color: "blue", mb: 0.5 }}>
                      Utilisez email :{" "}
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        user@example.com
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "blue", mb: 0.5 }}>
                      Mot de passe :{" "}
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        password
                      </Box>
                    </Typography>
                    <Link
                      href="register"
                      underline="hover"
                      sx={{
                        color: "blue",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        display: "inline-block",
                        mt: 1,
                      }}
                    >
                      Remplir automatiquement
                    </Link>
                  </Box>
                </Paper>

                <Box component="form" onSubmit={handleSubmit} sx={{ px: 1.3 }}>
                  {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                      {error}
                    </Typography>
                  )}

                  <Typography variant="body2" fontWeight="500">
                    Adresse e-mail
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votreemail@example.com"
                    sx={{ mb: 3 }}
                    required
                  />

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Mot de passe</Typography>
                    <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    type="password"
                    sx={{ mb: 3 }}
                    required
                  />

                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="body2">Se souvenir de moi</Typography>}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#FF6B00",
                      "&:hover": { bgcolor: "#e06000" },
                      textTransform: "none",
                      py: 1,
                      mb: 2,
                      boxShadow: "none",
                    }}
                  >
                    Se connecter
                  </Button>

                  <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="body2" color="text.secondary" marginRight="15px">
                      Vous n’avez pas de compte ?
                    </Typography>
                    <Link
                      to="/register"
                      variant="body2"
                      sx={{ color: "#FF6B00" }}
                      component={RouterLink}
                    >
                      S’inscrire
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default LoginForm;
