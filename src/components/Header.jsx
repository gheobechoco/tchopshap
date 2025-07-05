import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Badge,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Changé WalletIcon en ShoppingCartIcon
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Import du contexte panier

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useCart(); // Récupération des articles du panier

  // Calcul du nombre total d'articles dans le panier
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { text: 'Accueil', to: '/' },
    { text: 'Restaurants', to: '/restaurants' },
    { text: 'Plats', to: '/details' },
  ];

  return (
    <AppBar position="fixed" color="default" elevation={4}>
      <Container disableGutters sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              textDecoration: 'none', 
              color: '#FF7A00', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            TchôpShap
          </Typography>

          {isMobile ? (
            <>
              {/* Mobile menu button */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton component={Link} to="/cart" color="inherit">
                  <Badge badgeContent={totalItems} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Drawer for mobile nav */}
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                  <IconButton
                    onClick={() => setDrawerOpen(false)}
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <List sx={{ mt: 4 }}>
                    {navItems.map((item) => (
                      <ListItem 
                        key={item.text} 
                        button 
                        component={Link} 
                        to={item.to}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                    <ListItem 
                      button 
                      component={Link} 
                      to="/login"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <PersonIcon sx={{ mr: 1 }} />
                      <ListItemText primary="Connexion" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {/* Desktop nav links */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.to}
                    color="inherit"
                    sx={{ 
                      '&:hover': { 
                        color: '#FF7A00',
                        backgroundColor: 'rgba(255, 122, 0, 0.08)' 
                      },
                      fontWeight: 500
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              {/* Desktop actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  startIcon={<PersonIcon />}
                  sx={{ 
                    '&:hover': { 
                      color: '#FF7A00',
                      backgroundColor: 'rgba(255, 122, 0, 0.08)' 
                    },
                    fontWeight: 500
                  }}
                >
                  Connexion
                </Button>
                <IconButton 
                  component={Link} 
                  to="/cart" 
                  color="inherit"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 122, 0, 0.08)'
                    }
                  }}
                >
                  <Badge 
                    badgeContent={totalItems} 
                    color="primary"
                    overlap="circular"
                    sx={{
                      '& .MuiBadge-badge': {
                        right: -3,
                        top: 5,
                        backgroundColor: '#FF7A00'
                      }
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}