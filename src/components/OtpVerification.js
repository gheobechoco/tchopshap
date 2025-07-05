"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Container, Card, CardContent, Typography, Button, Grid } from "@mui/material";

export default function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Quand l’utilisateur clique sur un chiffre du pavé
  const handleDigit = (digit) => {
    setError("");
    const next = [...otp];
    const idx = next.findIndex((d) => d === "");
    if (idx !== -1) {
      next[idx] = digit;
      setOtp(next);
    }
  };

  // Quand l’utilisateur clique sur “⌫”
  const handleDelete = () => {
    setError("");
    const next = [...otp];
    const idx = next.map((d) => d === "").lastIndexOf(false);
    if (idx !== -1) {
      next[idx] = "";
      setOtp(next);
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Veuillez saisir les 6 chiffres du code.");
      return;
    }

    // Récupère email et userId stockés lors de l'inscription
    const email = window.sessionStorage.getItem("otpEmail");
    const userId = window.sessionStorage.getItem("otpUserId");

    if (!email || !userId) {
      setError("Session expirée. Veuillez recommencer l'inscription.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://api-tchop-shap.onrender.com/api/v1/utilisateurs/verify-otp",
        { userId, email, otp: code }
      );

      // Si l’API renvoie un token, l’OTP est valide
      if (res.data.token) {
        // On peut stocker le token si besoin :
        window.localStorage.setItem("token", res.data.token);

        // Récupère le rôle depuis la réponse
        const roleFromApi = res.data.utilisateur.role; // "client" ou "administrateur"

        // Supprime les valeurs temporaires
        window.sessionStorage.removeItem("otpEmail");
        window.sessionStorage.removeItem("otpUserId");

        // Redirection immédiate
        if (roleFromApi === "administrateur") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        // Pas de token → OTP invalide
        setError("Code OTP invalide. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur OTP :", err);
      if (!err.response) {
        setError("Impossible de joindre le serveur. Vérifiez votre connexion.");
      } else if (err.response.status >= 500) {
        setError("Erreur interne du serveur. Revenez plus tard.");
      } else {
        setError(err.response.data?.message || "Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ p: 3, maxWidth: 500, margin: "0 auto", borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Box textAlign="center" sx={{ mb: 3 }}>
              <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
                Vérification par code
              </Typography>
              <Typography variant="body2">
                Entrez les 6 derniers chiffres reçus par e-mail
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
              {otp.map((digit, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 60,
                    height: 60,
                    border: `2px solid ${digit ? "#1976d2" : "#ccc"}`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    backgroundColor: digit ? "#e3f2fd" : "transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  {digit}
                </Box>
              ))}
            </Box>

            <Grid container spacing={2} sx={{ maxWidth: 400, margin: "0 auto" }}>
              {keypad.map((key, index) => (
                <Grid item xs={4} key={index}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => (key === "del" ? handleDelete() : handleDigit(key))}
                    disabled={key === "" || loading}
                    sx={{
                      height: 60,
                      fontSize: "1.25rem",
                      borderRadius: 2,
                      borderColor: "#1976d2",
                      color: key === "del" ? "#f44336" : "#1976d2",
                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                        borderColor: "#1565c0",
                      },
                    }}
                  >
                    {key === "del" ? "⌫" : key}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}>
                {error}
              </Typography>
            )}

            <Box sx={{ maxWidth: 400, margin: "0 auto", mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  py: 1.5,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                {loading ? "Vérification en cours..." : "Vérifier le code"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
