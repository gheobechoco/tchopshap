import React from 'react';
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
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderConfirmation = () => {
  return (
    <>
      {/* Entête personnalisée */}
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ color: '#ff6600', fontWeight: 'bold', mr: 4 }}
          >
            TchôpShap
          </Typography>

          {/* Liens de navigation */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button sx={{ color: '#333', textTransform: 'none' }}>Accueil</Button>
            <Button sx={{ color: '#333', textTransform: 'none' }}>Restaurants</Button>
            <Button sx={{ color: '#333', textTransform: 'none' }}>Plats</Button>
          </Box>

          {/* Espace utilisateur */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ color: '#333' }}>Bonjour,</Typography>
            <Typography sx={{ color: '#333', fontWeight: 'bold' }}>
              Jean Dupont
            </Typography>
            <Button
              sx={{
                color: '#333',
                textTransform: 'none',
                fontWeight: 'medium',
              }}
            >
              Déconnexion
            </Button>
            <IconButton>
              <ShoppingBagOutlinedIcon sx={{ color: '#333' }} />
            </IconButton>
          </Box>
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
            Votre commande a été enregistrée avec succès.
          </Typography>
it
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
              <Typography fontWeight="bold">ORDER-256261</Typography>
            </Box>
            <Box textAlign="center">
              <Typography>Estimation de livraison :</Typography>
              <Typography fontWeight="bold">30-45 minutes</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid
            container
            spacing={2}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: '#ff6600', '&:hover': { bgcolor: '#e65c00' } }}
              >
                Retour à l'accueil
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Commander à nouveau
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default OrderConfirmation;
