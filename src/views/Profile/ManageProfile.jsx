import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  Divider,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";

// Import default avatar
import defaultAvatar from "../../assets/images/profile-default.jpg";

const ManageProfile = () => {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+212 666-666666",
      birthDate: "1990-01-01",
      address: "123 Rue Mohammed V, Casablanca",
      avatar: defaultAvatar,
    };
  });

  const [editedProfile, setEditedProfile] = useState({...profile});
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const theme = {
    primary: "#F4E029",
    secondary: "#060B47",
    accent: "#FF1F44",
    background: "#FFFFFF",
    text: "#000000",
    success: "#4CAF50",
  };

  const handleChange = (field) => (event) => {
    setEditedProfile({
      ...editedProfile,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    try {
      setProfile(editedProfile);
      localStorage.setItem('userProfile', JSON.stringify(editedProfile));
      setIsEditing(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Une erreur est survenue lors de la sauvegarde du profil');
    }
  };

  const handleCancel = () => {
    setEditedProfile({...profile});
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = {
          ...profile,
          avatar: reader.result
        };
        setProfile(updatedProfile);
        setEditedProfile(updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setEditedProfile({...profile});
    setIsEditing(true);
  };

  return (
    <Box
      sx={{
        p: 3,
        ml: "220px",
        width: "calc(100% - 220px)",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.background,
        }}
      >
        {/* Header with Avatar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={profile.avatar}
              sx={{
                width: 150,
                height: 150,
                border: `4px solid ${theme.primary}`,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
            <input
              accept="image/*"
              type="file"
              id="avatar-upload"
              hidden
              onChange={handleImageUpload}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: theme.secondary,
                  color: "white",
                  "&:hover": {
                    bgcolor: theme.accent,
                  },
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Box>
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              color: theme.secondary,
              fontWeight: "bold",
            }}
          >
            Mon Profil
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Profile Form */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              value={isEditing ? editedProfile.firstName : profile.firstName}
              onChange={handleChange('firstName')}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: theme.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              value={isEditing ? editedProfile.lastName : profile.lastName}
              onChange={handleChange('lastName')}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: theme.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={isEditing ? editedProfile.email : profile.email}
              onChange={handleChange('email')}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: theme.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Téléphone"
              value={isEditing ? editedProfile.phone : profile.phone}
              onChange={handleChange('phone')}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: theme.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date de naissance"
              type="date"
              value={isEditing ? editedProfile.birthDate : profile.birthDate}
              onChange={handleChange('birthDate')}
              disabled={!isEditing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon sx={{ color: theme.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Adresse"
              value={isEditing ? editedProfile.address : profile.address}
              onChange={handleChange('address')}
              disabled={!isEditing}
              multiline
              rows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon sx={{ color: theme.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
              sx={{
                bgcolor: theme.primary,
                color: theme.text,
                px: 4,
                py: 1.5,
                "&:hover": {
                  bgcolor: theme.secondary,
                  color: "white",
                },
              }}
            >
              Modifier le profil
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  color: theme.text,
                  borderColor: theme.secondary,
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: theme.accent,
                  },
                }}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  bgcolor: theme.primary,
                  color: theme.text,
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: theme.secondary,
                    color: "white",
                  },
                }}
              >
                Enregistrer
              </Button>
            </>
          )}
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Profil mis à jour avec succès!
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ManageProfile; 