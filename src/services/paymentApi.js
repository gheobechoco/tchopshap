// src/services/paymentApi.js
import axios from 'axios';

// ⚠️ CORRECTION : Utilise l'URL de base de ton backend déployé
// 🔍 Définition simple : C'est l'adresse de ton serveur backend qui est en ligne.
// 🛠️ Analogie : C'est l'adresse postale de la banque centrale (ton backend) sur internet.
// ⚙️ Dans notre code : On combine l'URL de base de ton déploiement avec le préfixe de tes routes de paiement.
const BACKEND_BASE_URL = "https://gestion-restaurant-api-tchopshap.onrender.com/api/v1/payment"; // 👈 Changement de 'paiements' à 'payments'

const paymentApi = {
  generateLink: async (paymentData) => {
    try {
      // La route complète sera maintenant :
      // https://gestion-restaurant-api-tchopshap.onrender.com/api/v1/payments/generate-link
      const url = `${BACKEND_BASE_URL}/generate-link`;
      console.log("URL appelée:", url);
      console.log("Données envoyées:", paymentData);

      const response = await axios.post(url, paymentData);
      return response.data;
    } catch (error) {
      console.error("Erreur complète:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la génération du lien (vérifiez le backend).");
    }
  },

  checkStatus: async (transactionId) => { // Paramètre plus spécifique
    try {
      // La route complète sera :
      // https://gestion-restaurant-api-tchopshap.onrender.com/api/v1/payments/check-status
      const response = await axios.get(`${BACKEND_BASE_URL}/check-status`, {
        params: { transactionId } // Structure plus claire
      });
      return response.data;
    } catch (error) {
      console.error("Erreur vérification statut:", error);
      throw new Error(error.response?.data?.message || "Erreur lors de la vérification du statut");
    }
  },

  receiveSecretCallback: async (secretData) => {
    try {
      // La route complète sera :
      // https://gestion-restaurant-api-tchopshap.onrender.com/api/v1/payments/secret-callback
      const response = await axios.post(`${BACKEND_BASE_URL}/secret-callback`, secretData);
      return response.data;
    } catch (error) {
      console.error("Erreur callback clé secrète:", error);
      throw new Error("Échec de l'enregistrement de la clé secrète");
    }
  },

  initiatePayment: async (paymentData) => {
    try {
      // La route complète sera :
      // https://gestion-restaurant-api-tchopshap.onrender.com/api/v1/payments/initiate
      const response = await axios.post(`${BACKEND_BASE_URL}/initiate`, paymentData);
      return response.data;
    } catch (error) {
      console.error("Erreur initiation paiement:", error);
      throw new Error(error.response?.data?.message || "Échec de l'initiation du paiement");
    }
  }
};

export default paymentApi;
