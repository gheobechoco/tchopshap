  // Importation des hooks et composants nécessaires
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";  // Pour le hook useState
  import { Box, Button, Typography, Container, Paper, TextField, FormControlLabel, Radio , Divider} from "@mui/material";  // Importation des composants UI
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";  // Importation de l'icône

  function ProfileForm() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
    const navigate = useNavigate();


    function handlePaymentMethodChange(event) {
      setSelectedPaymentMethod(event.target.value);
    }

    function handleConfirmOrder() { // ✅ Étape 3
      navigate("/confirmation");
    }
  

    return (
      <Container maxWidth={false} style={{ padding: "16px" }}>
        <Box display="flex" alignItems="center" marginBottom="24px" marginLeft="8px">
          <Button style={{ minWidth: "40px" }}>
            <ArrowBackIcon />
          </Button>
          <Typography>Retour</Typography>
        </Box>
        <Typography  variant="h5" style={{ fontWeight:"bold", marginBottom:"8px", marginLeft:"18px"}}>Finaliser la commande</Typography>
        <Typography style={{ color:"#666", marginBottom:"8px", marginLeft:"18px"}}>Remplissez les informations ci-dessous pour finaliser votre commande</Typography>
        <Paper elevation={0} style={{ border: "1px solid #e0e0e0", padding: "16px" , margin:"16px"}}>
        <Typography>Informations de livraison</Typography>
        <TextField  fullWidth label="Nom complet" defaultValue="Jean Dupont" style={{marginBottom: "16px"}}/>
        <TextField  fullWidth label="Adresse de livraison" placeholder="Adresse complète de livraison"  multiline rows={2}   style={{marginBottom: "16px"}}/>
        <TextField fullWidth label="Numero de telephone" placeholder="Pour vous contacter en cas de besoin" style={{marginBottom: "16px"}}/>
        <TextField fullWidth label="Instruction Special" placeholder="Instructions pour la livraison ou la préparation" multiline rows={2}  style={{ marginBottom: "16px"}}/>
      </Paper>

      <Paper elevation={0}   style={{ border: "1px solid #e0e0e0", padding: "24px" , margin:"24px"}}>
      <Typography variant="h6" style={{marginBottom: "16px"} }>Methode de Paiement</Typography>
      <FormControlLabel 
      value="card"
      control={
        <Radio
        checked={selectedPaymentMethod === "card"}
        onChange={handlePaymentMethodChange}
        value="card"
        />
      } 
      label="Carte bancaire"
      />
      <Box display="flex"  flex-direction="column" flexWrap="wrap" marginLeft="32px" marginTop="8px" marginBottom="16px">
        <TextField fullWidth  label="Numero de carte" placeholder="1234 5678 9012 3456 " style={{marginBottom: "16px"}}/>
    
      <Box display="flex"  gap="16px" >
        <TextField label="Date d'expiration" placeholder="MM/AA" style={{ width:"50%"}}></TextField>
        <TextField label="CVV" placeholder="123" style={{ width:"50%"}}></TextField>
      </Box> 
      </Box>
      <Box display="flex" flexDirection="column"  marginTop="16px">
      <FormControlLabel 
        value="mobile"
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
        value="cash"
        control={
          <Radio
          checked={selectedPaymentMethod === "cash"}
          onChange={handlePaymentMethodChange}
          value="cash"
          />
        }
        label="Especes à la livraison"
      />
      </Box>
      <Button
      variant="contained"
      fullWidth
      onClick={handleConfirmOrder} // ✅ Étape 4
      style={{
        padding:"16px", 
      color:"White", 
      backgroundColor: "#ff6b18", 
      textTransform: "none", 
      fontSize: "16px"
      }}
      
      fullwidth
      >
        confirmer la commande
      </Button>
    
      </Paper>
      <Paper elevation={0} style={{ border: "1px solid #e0e0e0", padding: "24px"}}>
        <Typography variant="h6" style={{marginBottom: "16px"}}>Récapitulatif</Typography>
        <Box display="flex" justifyContent={"space-between"}>
          <Typography>Sous-Total</Typography>
          <Typography>2480 f</Typography>
        </Box>
        <Box display="flex" justifyContent={"space-between"} marginTop="16px">
        <Typography>Frais de livraison</Typography>
        <Typography>299 f</Typography>
        </Box>
        
        <Divider style={{ margin: "16px 0" }} />

        <Box display="flex" justifyContent={"space-between"} marginbottom="16px">
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">2779 f</Typography>
        </Box>
      </Paper>
      </Container>
      
    );
  }

  export default ProfileForm;  // Assure-toi de toujours exporter par défaut
