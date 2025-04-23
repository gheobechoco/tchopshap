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
import WalletIcon from '@mui/icons-material/Wallet';
import CloseIcon from '@mui/icons-material/Close'; // Import de l'icône de fermeture
import { Link } from 'react-router-dom';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

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
            sx={{ textDecoration: 'none', color: '#FF7A00', fontWeight: 'bold' }}
          >
            TchôpShap
          </Typography>

          {isMobile ? (
            <>
              {/* Mobile menu button */}
              <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>

              {/* Drawer for mobile nav */}
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {/* Close button in the Drawer */}
                <IconButton
                  onClick={() => setDrawerOpen(false)}
                  sx={{ position: 'absolute', top: 10, right: 60 }}
                >
                  <CloseIcon />
                </IconButton>
                <Box sx={{ width: 250, p: 2 }} onClick={() => setDrawerOpen(false)}>
                  <List>
                    {navItems.map((item) => (
                      <ListItem key={item.text} button component={Link} to={item.to}>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                    <ListItem button component={Link} to="/login">
                      <PersonIcon sx={{ mr: 1 }} />
                      <ListItemText primary="Connexion" />
                    </ListItem>
                    <ListItem button component={Link} to="/cart">
                      <Badge badgeContent={1} color="primary">
                        <WalletIcon />
                      </Badge>
                      <ListItemText primary="Panier" sx={{ ml: 1 }} />
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
                    sx={{ '&:hover': { color: '#ff6600' } }}
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
                  sx={{ '&:hover': { color: '#ff6600' } }}
                >
                  Connexion
                </Button>
                <Badge badgeContent={1} color="primary">
                  <WalletIcon color="action" />
                </Badge>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}