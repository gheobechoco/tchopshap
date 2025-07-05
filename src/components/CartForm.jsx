import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import {
  AppBar, Toolbar, Typography, Button, Container,
  Card, Box, IconButton, Badge, Divider, useMediaQuery
} from "@mui/material";
import { ShoppingCart, Remove, Add, Delete } from "@mui/icons-material";

const CartForm = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.prix * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide");
      return;
    }
    navigate("/checkout");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>TchôpShap</Typography>
          <IconButton color="inherit">
            <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.quantity, 0)} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Votre Panier</Typography>

        {cartItems.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Votre panier est vide</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Voir le menu
            </Button>
          </Box>
        ) : (
          <>
            {cartItems.map(item => (
              <Card key={item.id_plat} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", p: 2, alignItems: "center" }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.nom}
                    sx={{ width: 80, height: 80, borderRadius: 1, mr: 2 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{item.nom}</Typography>
                    <Typography variant="body2">{item.prix} FCFA</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => updateQuantity(item.id_plat, item.quantity - 1)}>
                      <Remove />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(item.id_plat, item.quantity + 1)}>
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => removeFromCart(item.id_plat)} sx={{ ml: 1 }}>
                      <Delete color="error" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Sous-total:</Typography>
                <Typography>{subtotal} FCFA</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography>Frais de livraison:</Typography>
                <Typography>{deliveryFee} FCFA</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">{total} FCFA</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, py: 1.5 }}
                onClick={handleCheckout}
              >
                Passer la commande
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default CartForm;