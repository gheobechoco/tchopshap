// [ProfileForm.jsx]

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import {
  Box, Button, Typography, Container, Paper,
  TextField, FormControlLabel, Radio, Divider,
  CircularProgress, Alert, Snackbar
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import paymentApi from '../services/paymentApi';

const ProfileForm = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // States du formulaire
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  // States du paiement
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Calcul du total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.prix * item.quantity), 0);
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setPaymentError("");
  };

  const handleConfirmOrder = async () => {
    // Validation
    if (!fullName || !address || !phone) {
      setPaymentError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoadingPayment(true);
    setPaymentError("");

    try {
      if (selectedPaymentMethod === "cash") {
        // Enregistrement commande paiement cash
        await saveOrder();
        setSnackbarOpen(true);
        setTimeout(() => navigate("/confirmation"), 1500);
        return;
      }

      // Préparation données pour PVIT
      const paymentData = {
        amount: total,
        customer_name: fullName,
        customer_phone: phone,
        delivery_address: address,
        notes: instructions,
        product: `Commande TchôpShap (${cartItems.length} articles)`,
        reference: `CMD-${Date.now()}`,
        payment_method: selectedPaymentMethod,
        items: cartItems.map(item => ({
          name: item.nom,
          price: item.prix,
          quantity: item.quantity
        })),
        success_redirection_url: `${window.location.origin}/confirmation`,
        failed_redirection_url: `${window.location.origin}/payment-failed`,
        // 🔗 CORRECTION : L'URL de callback PVIT utilise maintenant '/payment'
        // 🔍 Définition simple : C'est l'adresse de ton serveur backend déployé que PVIT appellera en coulisses,
        // avec le préfixe de route 'payment' que tu as spécifié.
        callback_url_code: `https://gestion-restaurant-api-tchopshap.onrender.com/api/v1/payment/secret-callback`, // 👈 Mis à jour vers 'payment'
      };

      // Appel au backend pour générer le lien de paiement
      const response = await paymentApi.generateLink(paymentData);

      if (response?.paymentUrl) {
        // Sauvegarde la commande avant redirection
        await saveOrder();
        window.location.href = response.paymentUrl;
      } else {
        setPaymentError("Erreur lors de la génération du lien de paiement");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(error.response?.data?.message || "Erreur lors du traitement du paiement");
    } finally {
      setLoadingPayment(false);
    }
  };

  const saveOrder = async () => {
    // Ici vous enverriez normalement les données à votre backend
    console.log("Commande sauvegardée:", {
      customer: fullName,
      address,
      phone,
      instructions,
      items: cartItems,
      total,
      paymentMethod: selectedPaymentMethod,
      status: selectedPaymentMethod === "cash" ? "pending" : "processing"
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
          Retour
        </Button>
      </Box>

      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>Finaliser la commande</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Remplissez les informations pour finaliser votre commande</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Informations de livraison</Typography>
        <TextField
          fullWidth
          label="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Adresse de livraison"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Numéro de téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Instructions spéciales"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          multiline
          rows={2}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Méthode de paiement</Typography>

        <FormControlLabel
          control={
            <Radio
              checked={selectedPaymentMethod === "card"}
              onChange={handlePaymentMethodChange}
              value="card"
            />
          }
          label="Carte bancaire"
        />

        {selectedPaymentMethod === "card" && (
          <Box sx={{ ml: 4, mb: 2 }}>
            <TextField
              fullWidth
              label="Numéro de carte"
              placeholder="1234 5678 9012 3456"
              sx={{ mb: 2 }}
            />
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="Date d'expiration"
                placeholder="MM/AA"
              />
              <TextField
                fullWidth
                label="CVV"
                placeholder="123"
              />
            </Box>
          </Box>
        )}

        <FormControlLabel
          control={
            <Radio
              checked={selectedPaymentMethod === "mobile"}
              onChange={handlePaymentMethodChange}
              value="mobile"
            />
          }
          label="Mobile Money"
        />

        <FormControlLabel
          control={
            <Radio
              checked={selectedPaymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
              value="cash"
            />
          }
          label="Paiement en espèces à la livraison"
        />

        {paymentError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {paymentError}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, py: 1.5 }}
          onClick={handleConfirmOrder}
          disabled={loadingPayment || cartItems.length === 0}
        >
          {loadingPayment ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Confirmer la commande et payer"
          )}
        </Button>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Récapitulatif</Typography>
        <Box sx={{ mb: 1 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography>Sous-total:</Typography>
            <Typography>{subtotal} FCFA</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Frais de livraison:</Typography>
            <Typography>{deliveryFee} FCFA</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">{total} FCFA</Typography>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">
          Commande confirmée! {selectedPaymentMethod === "cash" ? "Paiement à la livraison" : "Paiement en cours"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileForm;
