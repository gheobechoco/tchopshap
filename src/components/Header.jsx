import { Link } from "react-router-dom"; 
import { AppBar, Toolbar, Typography, Button, Box, Container} from "@mui/material"; 
import PersonIcon from "@mui/icons-material/Person"; 
import WalletIcon from '@mui/icons-material/Wallet';
import Badge from '@mui/material/Badge'; 
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


export default function Header() {
  return (
    <AppBar position="fixed" color="default" elevation={4}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            TchôpShap
          </Typography>

          {/* Navigation - Center */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/" color="inherit">
              Acceuil
            </Button>
            <Button component={Link} to="/restaurant" color="inherit">
              Restaurant
            </Button>
            <Button component={Link} to="/plat" color="inherit">
              Plat
            </Button>
          </Box>

          {/* Login - Right */}
          <Button component={Link} to="/connexion" color="inherit" startIcon={<PersonIcon />}>
            Connexion
          </Button>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge badgeContent={1} color="primary">
              <WalletIcon color="action" />
            </Badge>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  )
}