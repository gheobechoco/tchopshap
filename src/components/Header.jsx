import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import WalletIcon from "@mui/icons-material/Wallet"
import Badge from "@mui/material/Badge"

export default function Header() {
  return (
    <AppBar position="fixed" color="default" elevation={4}>
      <Container>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 1, sm: 1 }, // Padding horizontal minimal
            width: "100%",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#FF7A00",
              fontWeight: "bold",
            }}
          >
            TchôpShap
          </Typography>

          {/* Navigation - Center */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/" color="inherit" sx={{'&:hover': { color: '#ff6600' }}}>
              Acceuil
            </Button>
            <Button component={Link} to="/restaurants" color="inherit" sx={{'&:hover': { color: '#ff6600' }}}>
              Restaurant
            </Button>
            <Button component={Link} to="/details" color="inherit" sx={{ '&:hover': { color: '#ff6600' } }}>
              Plat
            </Button>
          </Box>

          {/* Login - Right */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button component={Link} to="/connexion" color="inherit" startIcon={<PersonIcon />} sx={{'&:hover': { color: '#ff6600' }}}>
              Connexion
            </Button>
            <Badge badgeContent={1} color="primary">
              <WalletIcon color="action" />
            </Badge>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

