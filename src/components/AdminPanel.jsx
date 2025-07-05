import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

export default function AdminPanel() {
  // ——————————————————————————————————————————————
  // États et données
  // ——————————————————————————————————————————————
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [catForm, setCatForm] = useState({ categorie: "", image: "" });

  const [livreurs, setLivreurs] = useState([]);
  const [editLivreur, setEditLivreur] = useState(null);
  const [openLivreurDialog, setOpenLivreurDialog] = useState(false);
  const [livForm, setLivForm] = useState({
    nom: "",
    prenom: "",
    statut: "",
    typeDeVehicule: "",
    numeroDeTel: "",
  });

  const [plats, setPlats] = useState([]);
  const [editPlat, setEditPlat] = useState(null);
  const [openPlatDialog, setOpenPlatDialog] = useState(false);
  const [platForm, setPlatForm] = useState({
    nom: "",
    details: "",
    prix: "",
    imageFile: null,     // le File local
    imageUrl: "",        // l’URL Cloudinary
    idRestaurant: "",
  });

  const [restaurants, setRestaurants] = useState([]);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [openRestaurantDialog, setOpenRestaurantDialog] = useState(false);
  const [restForm, setRestForm] = useState({
    nom: "",
    adresse: "",
    phone: "",
    imageFile: null,    // le File local
    imageUrl: "",       // l’URL Cloudinary
    horaires: "",
    id_utilisateur: "",
    id_categorie: "",
  });

  // Loading state pour l’UX
  const [loading, setLoading] = useState(false);

  // ——————————————————————————————————————————————
  // Chargement initial (catégories, livreurs, plats, restaurants)
  // ——————————————————————————————————————————————
  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, livRes, platRes, restRes] = await Promise.all([
        axios.get("https://api-tchop-shap.onrender.com/api/v1/categories"),
        axios.get("https://api-tchop-shap.onrender.com/api/v1/livreurs"),
        axios.get("https://api-tchop-shap.onrender.com/api/v1/plats"),
        axios.get("https://api-tchop-shap.onrender.com/api/v1/restaurants"),
      ]);

      setCategories(catRes.data);
      setLivreurs(livRes.data);
      setPlats(platRes.data);
      setRestaurants(restRes.data);
    } catch (error) {
      console.error("Erreur fetchData :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ——————————————————————————————————————————————
  // Handler pour ouvrir chaque dialogue (plat, catégorie, livreur, restaurant)
  // ——————————————————————————————————————————————
  const openDialog = (type, item = null) => {
    switch (type) {
      case "plat":
        setEditPlat(item);
        setPlatForm(
          item
            ? {
                nom: item.nom,
                details: item.details,
                prix: item.prix,
                imageFile: null,
                imageUrl: item.image,
                idRestaurant: item.idRestaurant,
              }
            : { nom: "", details: "", prix: "", imageUrl: "", imageFile: null, idRestaurant: "" }
        );
        setOpenPlatDialog(true);
        break;

      case "cat":
        setEditCategory(item);
        setCatForm(
          item ? { categorie: item.categorie, image: item.image } : { categorie: "", image: "" }
        );
        setOpenCategoryDialog(true);
        break;

      case "liv":
        setEditLivreur(item);
        setLivForm(
          item
            ? {
                nom: item.nom,
                prenom: item.prenom,
                statut: item.statut,
                typeDeVehicule: item.typeDeVehicule,
                numeroDeTel: item.numeroDeTel,
              }
            : { nom: "", prenom: "", statut: "", typeDeVehicule: "", numeroDeTel: "" }
        );
        setOpenLivreurDialog(true);
        break;

      case "rest":
        setEditRestaurant(item);
        setRestForm(
          item
            ? {
                nom: item.nom,
                adresse: item.adresse,
                phone: item.phone,
                imageFile: null,
                imageUrl: item.image,
                horaires: item.horaires,
                id_utilisateur: item.id_utilisateur,
                id_categorie: item.id_categorie,
              }
            : { nom: "", adresse: "", phone: "", imageFile: null, imageUrl: "", horaires: "", id_utilisateur: "", id_categorie: "" }
        );
        setOpenRestaurantDialog(true);
        break;

      default:
        break;
    }
  };

  // ——————————————————————————————————————————————
  // CRUD PLATS
  // ——————————————————————————————————————————————
  const savePlat = async () => {
    try {
      if (!platForm.imageUrl) {
        alert("Veuillez uploader une image pour le plat !");
        return;
      }

      const payload = {
        nom: platForm.nom,
        details: platForm.details,
        prix: Number(platForm.prix),
        idRestaurant: Number(platForm.idRestaurant),
        image: platForm.imageUrl,
      };

      const res = editPlat
        ? await axios.put(
            `https://api-tchop-shap.onrender.com/api/v1/plats/${editPlat.idPlat}`,
            payload
          )
        : await axios.post("https://api-tchop-shap.onrender.com/api/v1/plats", payload);

      if (res.status === 200 || res.status === 201) {
        alert(editPlat ? "Plat modifié !" : "Plat ajouté !");
        setOpenPlatDialog(false);
        fetchData();
      }
    } catch (err) {
      console.error("🚨 Erreur savePlat:", err.response?.data || err);
      alert(`Erreur ${err.response?.status} : ${err.response?.data?.message || err.message}`);
    }
  };

  const deletePlat = async (plat) => {
    if (window.confirm(`Supprimer le plat "${plat.nom}" ?`)) {
      try {
        await axios.delete(`https://api-tchop-shap.onrender.com/api/v1/plats/${plat.idPlat}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ——————————————————————————————————————————————
  // CRUD CATÉGORIES
  // ——————————————————————————————————————————————
  const saveCategory = async () => {
    try {
      const payload = {
        categorie: catForm.categorie,
        image: catForm.image,
      };

      if (editCategory) {
        await axios.put(
          `https://api-tchop-shap.onrender.com/api/v1/categories/${editCategory.idCategorie}`,
          payload
        );
      } else {
        await axios.post("https://api-tchop-shap.onrender.com/api/v1/categories", payload);
      }

      setOpenCategoryDialog(false);
      fetchData();
    } catch (err) {
      console.error("Erreur détail catégories:", {
        error: err.response?.data,
        status: err.response?.status,
      });
      alert(`Erreur : ${err.response?.data?.message || "Échec de la sauvegarde"}`);
    }
  };

  const deleteCategory = async (cat) => {
    if (window.confirm(`Supprimer la catégorie "${cat.categorie}" ?`)) {
      try {
        await axios.delete(
          `https://api-tchop-shap.onrender.com/api/v1/categories/${cat.idCategorie}`
        );
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ——————————————————————————————————————————————
  // CRUD LIVREURS
  // ——————————————————————————————————————————————
  const saveLivreur = async () => {
    try {
      if (editLivreur) {
        await axios.put(
          `https://api-tchop-shap.onrender.com/api/v1/livreurs/${editLivreur.idLivreur}`,
          livForm
        );
      } else {
        await axios.post("https://api-tchop-shap.onrender.com/api/v1/livreurs", livForm);
      }
      setOpenLivreurDialog(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLivreur = async (liv) => {
    if (window.confirm(`Supprimer le livreur "${liv.nom} ${liv.prenom}" ?`)) {
      try {
        await axios.delete(`https://api-tchop-shap.onrender.com/api/v1/livreurs/${liv.idLivreur}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ——————————————————————————————————————————————
  // CRUD RESTAURANTS
  // ——————————————————————————————————————————————
  const saveRestaurant = async () => {
    try {
      if (!restForm.imageUrl) {
        alert("Veuillez uploader une image pour le restaurant !");
        return;
      }

      const payload = {
        nom: restForm.nom,
        adresse: restForm.adresse,
        phone: restForm.phone,
        image: restForm.imageUrl,
        horaires: Number(restForm.horaires),
        id_utilisateur: Number(restForm.id_utilisateur),
        id_categorie: Number(restForm.id_categorie),
      };

      const res = editRestaurant
        ? await axios.put(
            `https://api-tchop-shap.onrender.com/api/v1/restaurants/${editRestaurant.id_restaurant}`,
            payload
          )
        : await axios.post("https://api-tchop-shap.onrender.com/api/v1/restaurants", payload);

      if (res.status === 200 || res.status === 201) {
        alert(editRestaurant ? "Restaurant modifié !" : "Restaurant ajouté !");
        setOpenRestaurantDialog(false);
        fetchData();
      }
    } catch (err) {
      console.error("🚨 Erreur saveRestaurant:", err.response?.data || err);
      alert(`Erreur ${err.response?.status} : ${err.response?.data?.message || err.message}`);
    }
  };

  const deleteRestaurant = async (rest) => {
    if (window.confirm(`Supprimer le restaurant "${rest.nom}" ?`)) {
      try {
        await axios.delete(
          `https://api-tchop-shap.onrender.com/api/v1/restaurants/${rest.id_restaurant}`
        );
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ——————————————————————————————————————————————
  // Rendu JSX
  // ——————————————————————————————————————————————
  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Chargement des données…</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panneau d'administration
      </Typography>

      {/* === PLATS === */}
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Gestion des Plats
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => openDialog("plat")}
      >
        Ajouter un plat
      </Button>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plats.map((plat) => (
              <TableRow key={plat.idPlat}>
                <TableCell>
                  {plat.image ? (
                    <img
                      src={plat.image}
                      alt={plat.nom}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{plat.idPlat}</TableCell>
                <TableCell>{plat.nom}</TableCell>
                <TableCell>{plat.details}</TableCell>
                <TableCell>{plat.prix}</TableCell>
                <TableCell>{plat.idRestaurant}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => openDialog("plat", plat)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deletePlat(plat)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* === CATÉGORIES === */}
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Gestion des Catégories
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => openDialog("cat")}
      >
        Ajouter une catégorie
      </Button>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.idCategorie}>
                <TableCell>
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.categorie}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{cat.idCategorie}</TableCell>
                <TableCell>{cat.categorie}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => openDialog("cat", cat)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteCategory(cat)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* === LIVREURS === */}
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Gestion des Livreurs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => openDialog("liv")}
      >
        Ajouter un livreur
      </Button>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Véhicule</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {livreurs.map((liv) => (
              <TableRow key={liv.idLivreur}>
                <TableCell>{liv.nom}</TableCell>
                <TableCell>{liv.prenom}</TableCell>
                <TableCell>{liv.numeroDeTel}</TableCell>
                <TableCell>{liv.statut}</TableCell>
                <TableCell>{liv.typeDeVehicule}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => openDialog("liv", liv)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteLivreur(liv)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* === RESTAURANTS === */}
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Gestion des Restaurants
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => openDialog("rest")}
      >
        Ajouter un restaurant
      </Button>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Horaires</TableCell>
              <TableCell>ID Utilisateur</TableCell>
              <TableCell>ID Catégorie</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((rest) => (
              <TableRow key={rest.id_restaurant}>
                <TableCell>
                  {rest.image ? (
                    <img
                      src={rest.image}
                      alt={rest.nom}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{rest.id_restaurant}</TableCell>
                <TableCell>{rest.nom}</TableCell>
                <TableCell>{rest.adresse}</TableCell>
                <TableCell>{rest.phone}</TableCell>
                <TableCell>{rest.horaires}</TableCell>
                <TableCell>{rest.id_utilisateur}</TableCell>
                <TableCell>{rest.id_categorie}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => openDialog("rest", rest)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteRestaurant(rest)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* ——————————————————————————————————————————————
          Dialogues partagés pour chaque type
      —————————————————————————————————————————————— */}

      {/* === DIALOGUE PLAT === */}
      <Dialog open={openPlatDialog} onClose={() => setOpenPlatDialog(false)}>
        <DialogTitle>{editPlat ? "Modifier un plat" : "Ajouter un plat"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom"
            fullWidth
            value={platForm.nom}
            onChange={(e) => setPlatForm((prev) => ({ ...prev, nom: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Détails"
            fullWidth
            multiline
            rows={3}
            value={platForm.details}
            onChange={(e) => setPlatForm((prev) => ({ ...prev, details: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Prix"
            fullWidth
            type="number"
            value={platForm.prix}
            onChange={(e) => setPlatForm((prev) => ({ ...prev, prix: e.target.value }))}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="resto-select-label">Restaurant</InputLabel>
            <Select
              labelId="resto-select-label"
              label="Restaurant"
              value={platForm.idRestaurant}
              onChange={(e) =>
                setPlatForm((prev) => ({ ...prev, idRestaurant: e.target.value }))
              }
            >
              {restaurants.map((r) => (
                <MenuItem key={r.id_restaurant} value={r.id_restaurant}>
                  {r.nom} (ID {r.id_restaurant})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Upload image vers Cloudinary */}
          <input
            type="file"
            accept="image/*"
            style={{ marginTop: 16 }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setPlatForm((prev) => ({ ...prev, imageFile: file }));

              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "tchopShap_preset");

              const res = await fetch(
                "https://api.cloudinary.com/v1_1/digyqalzq/image/upload",
                { method: "POST", body: data }
              );
              const json = await res.json();
              setPlatForm((p) => ({ ...p, imageUrl: json.secure_url }));
            }}
          />

          {platForm.imageUrl && (
            <img
              src={platForm.imageUrl}
              alt="Aperçu plat"
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                marginTop: 8,
                borderRadius: 4,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPlatDialog(false)}>Annuler</Button>
          <Button variant="contained" onClick={savePlat}>
            {editPlat ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* === DIALOGUE CATÉGORIE === */}
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>
          {editCategory ? "Modifier une catégorie" : "Ajouter une catégorie"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom de la catégorie"
            fullWidth
            value={catForm.categorie}
            onChange={(e) => setCatForm((prev) => ({ ...prev, categorie: e.target.value }))}
          />

          {/* Upload image catégorie */}
          <input
            type="file"
            accept="image/*"
            style={{ marginTop: 16 }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setCatForm((prev) => ({ ...prev, image: file }));

              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "tchopShap_preset");

              const res = await fetch(
                "https://api.cloudinary.com/v1_1/digyqalzq/image/upload",
                { method: "POST", body: data }
              );
              const json = await res.json();
              setCatForm((prev) => ({ ...prev, image: json.secure_url }));
            }}
          />

          {catForm.image && typeof catForm.image === "string" && (
            <img
              src={catForm.image}
              alt="Aperçu catégorie"
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                marginTop: 8,
                borderRadius: 4,
              }}
            />
          )}
          {catForm.image && typeof catForm.image !== "string" && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Fichier sélectionné : {catForm.image.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Annuler</Button>
          <Button variant="contained" onClick={saveCategory}>
            {editCategory ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* === DIALOGUE LIVREUR === */}
      <Dialog open={openLivreurDialog} onClose={() => setOpenLivreurDialog(false)}>
        <DialogTitle>{editLivreur ? "Modifier un livreur" : "Ajouter un livreur"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom"
            fullWidth
            value={livForm.nom}
            onChange={(e) => setLivForm((prev) => ({ ...prev, nom: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Prénom"
            fullWidth
            value={livForm.prenom}
            onChange={(e) => setLivForm((prev) => ({ ...prev, prenom: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Téléphone"
            fullWidth
            value={livForm.numeroDeTel}
            onChange={(e) => setLivForm((prev) => ({ ...prev, numeroDeTel: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Statut"
            fullWidth
            value={livForm.statut}
            onChange={(e) => setLivForm((prev) => ({ ...prev, statut: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Type de véhicule"
            fullWidth
            value={livForm.typeDeVehicule}
            onChange={(e) => setLivForm((prev) => ({ ...prev, typeDeVehicule: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLivreurDialog(false)}>Annuler</Button>
          <Button variant="contained" onClick={saveLivreur}>
            {editLivreur ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* === DIALOGUE RESTAURANT === */}
      <Dialog open={openRestaurantDialog} onClose={() => setOpenRestaurantDialog(false)}>
        <DialogTitle>
          {editRestaurant ? "Modifier un restaurant" : "Ajouter un restaurant"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom"
            fullWidth
            value={restForm.nom}
            onChange={(e) => setRestForm((prev) => ({ ...prev, nom: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Adresse"
            fullWidth
            value={restForm.adresse}
            onChange={(e) => setRestForm((prev) => ({ ...prev, adresse: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Téléphone"
            fullWidth
            value={restForm.phone}
            onChange={(e) => setRestForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Horaires (en nombre d’heures ou code)"
            fullWidth
            type="number"
            value={restForm.horaires}
            onChange={(e) => setRestForm((prev) => ({ ...prev, horaires: e.target.value }))}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="cat-rest-select-label">Catégorie</InputLabel>
            <Select
              labelId="cat-rest-select-label"
              label="Catégorie"
              value={restForm.id_categorie}
              onChange={(e) =>
                setRestForm((prev) => ({ ...prev, id_categorie: e.target.value }))
              }
            >
              {categories.map((c) => (
                <MenuItem key={c.idCategorie} value={c.idCategorie}>
                  {c.categorie} (ID {c.idCategorie})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="ID Utilisateur"
            fullWidth
            type="number"
            value={restForm.id_utilisateur}
            onChange={(e) =>
              setRestForm((prev) => ({ ...prev, id_utilisateur: e.target.value }))
            }
          />

          {/* Upload image restaurant */}
          <input
            type="file"
            accept="image/*"
            style={{ marginTop: 16 }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setRestForm((prev) => ({ ...prev, imageFile: file }));

              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "tchopShap_preset");

              const res = await fetch(
                "https://api.cloudinary.com/v1_1/digyqalzq/image/upload",
                { method: "POST", body: data }
              );
              const json = await res.json();
              setRestForm((prev) => ({ ...prev, imageUrl: json.secure_url }));
            }}
          />

          {restForm.imageUrl && (
            <img
              src={restForm.imageUrl}
              alt="Aperçu restaurant"
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                marginTop: 8,
                borderRadius: 4,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRestaurantDialog(false)}>Annuler</Button>
          <Button variant="contained" onClick={saveRestaurant}>
            {editRestaurant ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
