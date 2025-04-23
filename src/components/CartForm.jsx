"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  Box,
  IconButton,
  Badge,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ShoppingCart,
  Remove,
  Add,
  Delete,
  Instagram,
  Twitter,
  Language,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Custom theme to match the design exactly
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B00", // Orange color from the design
    },
    secondary: {
      main: "#1E2A38", // Dark blue/black for the footer
    },
    background: {
      default: "#F8F9FA",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          borderRadius: 8,
        },
      },
    },
  },
});

export default function CartForm() {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const unitPrice = 12.9;
  const deliveryFee = 2.99;
  const subtotal = unitPrice * quantity;
  const total = subtotal + deliveryFee;

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDelete = () => {
    setQuantity(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: "white" }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              paddingX: isMobile ? 2 : 3,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "primary.main", fontWeight: "bold" }}
            >
              TchôpShap
            </Typography>

            <Box sx={{ display: isMobile ? "none" : "flex", gap: 2 }}>
              <Button color="inherit">Accueil</Button>
              <Button color="inherit">Restaurants</Button>
              <Button color="inherit">Plats</Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
              <Button color="inherit" sx={{ display: isMobile ? "none" : "block" }}>
                Connexion
              </Button>
              <IconButton color="inherit">
                <Badge badgeContent={3} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ py: 4, flexGrow: 1, px: isMobile ? 2 : 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
            Votre panier
          </Typography>

          {/* Cart Items Card */}
          <Card sx={{ mb: 3 }}>
            <Box sx={{ p: 3, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center" }}>
              <Box
                component="img"
                src="/images/burger.svg"
                alt="Burger Classique"
                sx={{
                  width: isMobile ? 80 : 60,
                  height: isMobile ? 80 : 60,
                  mr: isMobile ? 0 : 2,
                  mb: isMobile ? 2 : 0,
                  borderRadius: "4px",
                }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">Burger Classique</Typography>
                <Typography variant="body2" color="text.secondary">
                  {unitPrice.toFixed(2)}€
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" onClick={handleDecrement}>
                  <Remove fontSize="small" />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton size="small" onClick={handleIncrement}>
                  <Add fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleDelete}>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Card>

          {/* Summary Card */}
          <Card>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Récapitulatif
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Sous-total</Typography>
                <Typography variant="body2">{subtotal.toFixed(2)}€</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body2">Frais de livraison</Typography>
                <Typography variant="body2">{deliveryFee.toFixed(2)}€</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="body1" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {total.toFixed(2)}€
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5, borderRadius: 1 }}
                onClick={() => navigate("/checkout")}
              >
                <Typography color="white">Commander</Typography>
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}