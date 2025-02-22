import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

// Import sample logos
import logo1 from "../../assets/images/organizer-1.jpg";
import logo2 from "../../assets/images/organizer-2.jpg";
import logo3 from "../../assets/images/organizer-3.jpg";

const ManageOrganizers = () => {
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [emailContent, setEmailContent] = useState({
    subject: "",
    message: "",
  });
  const [organizers, setOrganizers] = useState([
    {
      id: 1,
      name: "EventPro Morocco",
      logo: logo1,
      email: "contact@eventpro.ma",
      phone: "+212 522-123456",
      isBlocked: false,
    },
    {
      id: 2,
      name: "Festival Management",
      logo: logo2,
      email: "info@festivalmanagement.ma",
      phone: "+212 537-789012",
      isBlocked: false,
    },
    {
      id: 3,
      name: "Concerts & Shows",
      logo: logo3,
      email: "booking@concertshows.ma",
      phone: "+212 539-345678",
      isBlocked: true,
    },
  ]);

  useEffect(() => {
    // Charger les organisateurs depuis le localStorage s'ils existent
    const storedOrganizers = localStorage.getItem('organizers');
    if (storedOrganizers) {
      setOrganizers(JSON.parse(storedOrganizers));
    } else {
      // Si pas d'organisateurs stockés, sauvegarder les organisateurs par défaut
      localStorage.setItem('organizers', JSON.stringify(organizers));
    }
  }, []);

  const handleEmailClick = (organizer) => {
    setSelectedOrganizer(organizer);
    setOpenEmailDialog(true);
  };

  const handleBlockClick = (organizer) => {
    setSelectedOrganizer(organizer);
    setOpenBlockDialog(true);
  };

  const handleSendEmail = () => {
    console.log("Sending email to:", selectedOrganizer.email, emailContent);
    setOpenEmailDialog(false);
    setEmailContent({ subject: "", message: "" });
  };

  const handleBlock = () => {
    const updatedOrganizers = organizers.map(org => {
      if (org.id === selectedOrganizer.id) {
        return { ...org, isBlocked: !org.isBlocked };
      }
      return org;
    });

    setOrganizers(updatedOrganizers);
    localStorage.setItem('organizers', JSON.stringify(updatedOrganizers));
    setOpenBlockDialog(false);
    setSelectedOrganizer(null);
  };

  return (
    <Box
      sx={{
        p: 3,
        ml: "220px",
        width: "calc(100% - 220px)",
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#000000",
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
        }}
      >
        Gérer les Organisateurs
      </Typography>

      <Grid container spacing={3}>
        {organizers.map((organizer) => (
          <Grid item xs={12} key={organizer.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 2,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
                border: organizer.isBlocked ? "2px solid #FF1F44" : "none",
              }}
            >
              {/* Organizer Logo */}
              <img
                src={organizer.logo}
                alt={organizer.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />

              {/* Organizer Details */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  {organizer.name}
                  {organizer.isBlocked && (
                    <Typography
                      component="span"
                      sx={{
                        color: "#FF1F44",
                        ml: 2,
                        fontSize: "0.9rem",
                      }}
                    >
                      (Bloqué)
                    </Typography>
                  )}
                </Typography>

                <Box sx={{ display: "flex", gap: 4, mb: 1 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon sx={{ color: "#1E90FF" }} />
                    <Typography variant="body2">{organizer.email}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon sx={{ color: "#1E90FF" }} />
                    <Typography variant="body2">{organizer.phone}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  onClick={() => handleEmailClick(organizer)}
                  sx={{
                    bgcolor: "#1976D2",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#1565C0",
                    },
                  }}
                >
                  Email
                </Button>

                <Button
                  variant="contained"
                  startIcon={<BlockIcon />}
                  onClick={() => handleBlockClick(organizer)}
                  sx={{
                    bgcolor: organizer.isBlocked ? "#4CAF50" : "#FF1F44",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: organizer.isBlocked ? "#43A047" : "#E61B3D",
                    },
                  }}
                >
                  {organizer.isBlocked ? "Débloquer" : "Bloquer"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Email Dialog */}
      <Dialog
        open={openEmailDialog}
        onClose={() => setOpenEmailDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Envoyer un Email à {selectedOrganizer?.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Sujet"
            value={emailContent.subject}
            onChange={(e) =>
              setEmailContent((prev) => ({ ...prev, subject: e.target.value }))
            }
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={emailContent.message}
            onChange={(e) =>
              setEmailContent((prev) => ({ ...prev, message: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmailDialog(false)}>Annuler</Button>
          <Button onClick={handleSendEmail} variant="contained">
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Block Confirmation Dialog */}
      <Dialog
        open={openBlockDialog}
        onClose={() => setOpenBlockDialog(false)}
      >
        <DialogTitle>
          {selectedOrganizer?.isBlocked ? "Débloquer" : "Bloquer"} l'Organisateur
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir {selectedOrganizer?.isBlocked ? "débloquer" : "bloquer"} {selectedOrganizer?.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBlockDialog(false)}>Annuler</Button>
          <Button 
            onClick={handleBlock} 
            variant="contained"
            sx={{
              bgcolor: selectedOrganizer?.isBlocked ? "#4CAF50" : "#FF1F44",
              "&:hover": {
                bgcolor: selectedOrganizer?.isBlocked ? "#43A047" : "#E61B3D",
              }
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageOrganizers; 