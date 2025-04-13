import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
  Paper,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function LoginForm() {
  return (
    <>
      <Header />
      
      {/* Main Content */}
      <Box sx={{ bgcolor: "#f8f9fa", py: 9,border: "1px solid #333" }}>
        <Container sx={{ my: 4 }}>
          <Box sx={{ maxWidth: 500, mx: "auto" , border: "1px solid #333",borderRadius: 1 }}>
            {/* Login Card */}
            <Card sx={{ boxShadow: "0 2px 10px rgba(0,0,0,0.08)", borderRadius: 1 }}>
              <CardContent sx={{ py: 4 }}>
                {/* Title Section */}
                <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Connexion
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                  Connectez-vous pour accéder à votre compte
                </Typography>

                {/* Demo Info Section */}
<Paper
  sx={{
    bgcolor: "#f0f7ff",
    p: 2,
    mb: 3,
    mx: 1,
    borderRadius: 1,
  }}
>
  <Box>
    {/* Titre en bleu + gras */}
    <Typography
      variant="body2"
      sx={{ fontWeight: 700, color: "blue", mb: 1 }}
    >
      Info démo:
    </Typography>

    {/* Email en bleu */}
    <Typography
      variant="body2"
      sx={{ color: "blue", mb: 0.5 }}
    >
      Utilisez email :{" "}
      <Box component="span" sx={{ fontWeight: 600 }}>
        user@example.com
      </Box>
    </Typography>

    {/* Mot de passe en bleu */}
    <Typography
      variant="body2"
      sx={{ color: "blue", mb: 0.5 }}
    >
      Mot de passe :{" "}
      <Box component="span" sx={{ fontWeight: 600 }}>
        password
      </Box>
    </Typography>

    {/* Lien en bleu et stylé */}
    <Link
      href="#"
      underline="hover"
      sx={{
        color: "blue",
        fontSize: "0.875rem",
        fontWeight: 500,
        display: "inline-block",
        mt: 1,
      }}
    >
      Remplir automatiquement
    </Link>
  </Box>
</Paper>

                <Box component="form"  sx={{ px: 1.3 }}>
                  <Typography variant="body2" fontWeight="500">
                  Adresse e-mail
                  </Typography>
                  <TextField fullWidth size="small" placeholder="votreemail@example.com"  sx={{mb:3}}/>
                  <Box display="flex" justifyContent="space-between"  align-items="center">
                    <Typography variant="body2">
                      Mot de passe
                    </Typography>
                    <Link href="#" variant="body2">
                    Mot de passe oublier?
                    </Link>
                  </Box>
                  <TextField fullWidth size="small" placeholder=" Votre mot de passe"  sx={{mb:3}}/>
                  <FormControlLabel 
                    control={<Checkbox size="small"/>}
                    label={<Typography variant="body2">Se souvenir de moi</Typography>}
                  />

                  <Button fullWidth variant="contained" sx={{
                      bgcolor: "#FF6B00",
                      "&:hover": { bgcolor: "#e06000" },
                      textTransform: "none",
                      py: 1,
                      mb: 2,
                      boxShadow: "none",
                    }}>Se connecter</Button>

                  <Box display={"flex"} justifyContent="center" alignItems="center">
                    <Typography varianr="h5" color="text.secondary" marginRight="15px">
                      Vous n'avez pas de compte?
                    </Typography>{" "}
                    <Link href="/signup" variant="body2" sx={{ color: "#FF6B00" }}>
                      S'inscrire
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

export default LoginForm;