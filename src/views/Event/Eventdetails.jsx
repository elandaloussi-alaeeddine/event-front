import React, { useState } from "react";
import image from "../../assets/images/event-5.jpg";
import EventIcon from "@mui/icons-material/Event"; // For date
import LocationOnIcon from "@mui/icons-material/LocationOn"; // For location
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // For time
import DescriptionIcon from "@mui/icons-material/Description"; // For description
import ContactPhoneIcon from "@mui/icons-material/ContactPhone"; // For contact
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

// Mock data for the event
const event = {
  id: 1,
  image: image,
  title: "Le Fameux Duo SAID & WADIE",
  date: "Samedi 18 Janvier 2025",
  location: "Théâtre Mohammed 5, RABAT",
  time: "Ouverture des portes à 19:30",
  price: "100 MAD",
  description: "Vite ! Achetez rapidement vos tickets.",
  contact: "08 17 56 29",
  detailedDescription:
    "Le Fameux Duo SAID & WADIE revient sur scène pour un spectacle inoubliable ! Plongez dans un univers musical riche et varié, alliant tradition et modernité. Ce duo légendaire vous promet une soirée remplie d'émotions et de surprises. Ne manquez pas cet événement unique !",
};

// Theme colors
const theme = {
  primary: "#F4E029", // Yellow
  secondary: "#060B47", // Dark Blue
  background: "#040458", // Dark Blue background
  text: "#FFFFFF", // White text
  price: "#FF1F44", // Red for price
  submit: "#000000", // Black for button text
};

const EventDetail = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  // Handle finalize order
  const handleBuyNow = () => {
    // Stocker les détails de l'événement pour la page de paiement
    localStorage.setItem('paymentDetails', JSON.stringify({
      eventTitle: event.title,
      eventPrice: event.price,
      eventDate: event.date
    }));
    
    // Rediriger vers la page de paiement
    navigate('/app/payment');
  };

  return (
    <Box
      sx={{
        p: 3,
        ml: "50px", // Add left margin to account for the sidebar width
        width: "calc(100% - 80px)", // Adjust width to fit the remaining space
        backgroundColor: theme.text, // White background
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          p: 3,
          mt : -4,
          ml: 20,
          mr: -5,
          borderRadius: "16px", // Same width as the Event Component
          Height: "100%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          
        }}
      >
        {/* Event Image */}
        <Box sx={{ flex: 1 }}>
          <img
            src={event.image}
            alt={event.title}
            style={{
              width: "100%",
              height: "390px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          />
        </Box>

        {/* Event Details */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            height: "390px",
            borderRadius: "16px",
            backgroundColor: theme.secondary,
            color: theme.text,
            boxShadow: 3, // Added shadow for depth
            transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover effect
            "&:hover": {
              transform: "translateY(-4px)", // Subtle lift on hover
              boxShadow: 6, // Enhanced shadow on hover
            },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {event.title}
          </Typography>

          {/* Date with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EventIcon sx={{ color: theme.textSecondary }} />
            <Typography variant="h5">{event.date}</Typography>
          </Box>

          {/* Location with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon sx={{ color: theme.textSecondary }} />
            <Typography variant="body1">
              <strong>Lieu:</strong> {event.location}
            </Typography>
          </Box>

          {/* Time with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ color: theme.textSecondary }} />
            <Typography variant="body1">
              <strong>Heure:</strong> {event.time}
            </Typography>
          </Box>

          {/* Price with Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: theme.price,
              borderRadius: "5px",
              color: theme.prix,
              py: 0.5,
              px :1.5,
              width: "135px",
              fontWeight: "bold",
            }}
          >
            <Typography variant="body1">Prix: {event.price}</Typography>
          </Box>

          {/* Description with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DescriptionIcon sx={{ color: theme.textSecondary }} />
            <Typography variant="body1">{event.description}</Typography>
          </Box>

          {/* Contact with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ContactPhoneIcon sx={{ color: theme.textSecondary }} />
            <Typography variant="body1">
              <strong>Contact:</strong> {event.contact}
            </Typography>
          </Box>

          {/* Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.primary,
              color: theme.submit,
              fontWeight: "bold",
              py: 1.2,
              "&:hover": { bgcolor: theme.primary, opacity: 0.9 },
            }}
            onClick={handleBuyNow}
          >
            Acheter maintenant
          </Button>
        </Box>
        
      </Paper>
      <Box
          sx={{
          mt: 4,
          p: 3,
          backgroundColor: theme.text,
          borderRadius: "16px",
          color: theme.submit,
          boxShadow: 3,
          ml: "160px", // Add left margin to account for the sidebar width
          width: "calc(100% - 120px)"
              }}
                >   
    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
    Description de l'Événement
    </Typography>
      {event.detailedDescription}
    </Box>

      {/* Detailed Description Section */}
      

      {/* Order Summary Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Récapitulatif de la Commande
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Événement:</strong> {event.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Date:</strong> {event.date}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Lieu:</strong> {event.location}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Prix:</strong> {event.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: theme.text }}>
            Annuler
          </Button>
          <Button
            onClick={() => {
              // Handle finalize order
              alert("Commande finalisée ! Merci pour votre achat.");
              setOpenDialog(false);
            }}
            sx={{
              bgcolor: theme.primary,
              color: theme.submit,
              fontWeight: "bold",
            }}
          >
            Finaliser la Commande
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventDetail;