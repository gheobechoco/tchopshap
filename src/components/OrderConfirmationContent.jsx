import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
  Paper,
  Grid,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Footer from "../components/Footer";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customerName = location.state?.customerName || "Jean Dupont";
  const orderNumber = location.state?.orderNumber || "ORDER-" + Math.floor(Math.random() * 1000000);
  const estimatedDelivery = location.state?.estimatedDelivery || "30-45 minutes";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Entête personnalisée */}
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar sx={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              color: '#ff6600',
              fontWeight: 'bold',
              mr: isMobile ? 'auto' : 4,
            }}
          >
            TchôpShap
          </Typography>

          {/* Liens de navigation */}
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
                sx={{ mr: 2 }}
              >
                <MenuIcon sx={{color: '#333'}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/">
                  Accueil
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/restaurants">
                  Restaurants
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/details">
                  Plats
                </MenuItem>
                <Divider />
                <MenuItem disabled>
                  <Typography sx={{ color: '#333' }}>Bonjour,</Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography sx={{ color: '#333', fontWeight: 'bold' }}>
                    {customerName}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>
                  Déconnexion
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/cart'); }}>
                  Panier
                  <ShoppingBagOutlinedIcon sx={{ color: '#333', ml: 1 }} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: '#333',
                  textTransform: 'none',
                  '&:hover': { color: '#ff6600' }
                }}
              >
                Accueil
              </Button>
              <Button
                component={Link}
                to="/restaurants"
                sx={{
                  color: '#333',
                  textTransform: 'none',
                  '&:hover': { color: '#ff6600' }
                }}
              >
                Restaurants
              </Button>
              <Button
                component={Link}
                to="/details"
                sx={{
                  color: '#333',
                  textTransform: 'none',
                  '&:hover': { color: '#ff6600' }
                }}
              >
                Plats
              </Button>
            </Box>
          )}

          {/* Espace utilisateur (caché sur mobile) */}
          {!isMobile && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
              <Typography sx={{ color: '#333' }}>Bonjour,</Typography>
              <Typography sx={{ color: '#333', fontWeight: 'bold' }}>
                {customerName}
              </Typography>
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: '#333',
                  textTransform: 'none',
                  fontWeight: 'medium',
                  '&:hover': { color: '#ff6600' },
                }}
              >
                Déconnexion
              </Button>
              <IconButton component={Link} to="/cart">
                <ShoppingBagOutlinedIcon sx={{ color: '#333' }} />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Contenu de confirmation */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Confirmation de commande
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              sx={{
                bgcolor: '#d4f5dc',
                color: '#4caf50',
                width: 56,
                height: 56,
              }}
            >
              <CheckCircleIcon fontSize="large" />
            </Avatar>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Commande confirmée !
          </Typography>

          <Typography align="center" color="text.secondary" mb={3}>
            Merci {customerName}, votre commande a été enregistrée avec succès.
          </Typography>

          {/* Box grise contenant les deux infos */}
          <Box
            bgcolor="#f1f1f1"
            p={3}
            borderRadius={2}
            mb={3}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box textAlign="center">
              <Typography>Numéro de commande :</Typography>
              <Typography fontWeight="bold">{orderNumber}</Typography>
            </Box>
            <Box textAlign="center">
              <Typography>Estimation de livraison :</Typography>
              <Typography fontWeight="bold">{estimatedDelivery}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/')}
                sx={{
                  bgcolor: '#ff6600',
                  '&:hover': {
                    bgcolor: '#e65c00',
                    transition: 'background-color 0.3s ease'
                  }
                }}
              >
                Retour à l'accueil
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/restaurants')}
                sx={{
                  '&:hover': {
                    borderColor: '#ff6600',
                    color: '#ff6600'
                  }
                }}
              >
                Commander à nouveau
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default OrderConfirmation;