import React from "react";
import { Box, Grid, Typography, Paper, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import image1 from "../../assets/images/event-1.jpg";
import image2 from "../../assets/images/event-2.jpg";
import image3 from "../../assets/images/event-3.jpg";
import image5 from "../../assets/images/event-5.jpg";
import image6 from "../../assets/images/event-6.jpg";
import image4 from "../../assets/images/event-4.jpg";

// Using the same mock data structure
const events = [
  {
    id: 1,
    image: image1,
    title: "Soirée 'IDYENAYEER' à Casablanca",
    location: "Casablanca, Complexe Al Hassani",
    time: "01 | 18 h 49 m 45 s",
    price: "200MAD",
    status: "J'achète",
  },
  {
    id: 2,
    image: image2,
    title: "Taha Nouri en Concert à Tanger",
    location: "Tanger, Théâtre palais des arts et de la",
    time: "01 | 20 h 49 m 45 s",
    price: "150MAD",
    status: "J'achète",
  },
  {
    id: 3,
    image: image3,
    title: "Hoba Hoba Spirit est de retour à Casablanca",
    location: "Casablanca, Megarama",
    time: "01 | 20 h 49 m 45 s",
    price: "200MAD",
    status: "Guichet Fermé",
  },
  {
    id: 4,
    image: image5,
    title: "Nacim Haddad en tournée à Oujda",
    location: "Oujda, Théâtre Mohammed 6",
    time: "01 | 20 h 49 m 45 s",
    price: "200MAD",
    status: "Guichet Fermé",
  },
  {
    id: 5,
    image: image6,
    title: "Nacim Haddad en tournée à Oujda",
    location: "Oujda, Théâtre Mohammed 6",
    time: "01 | 20 h 49 m 45 s",
    price: "400MAD",
    status: "J'achète",

  },
  {
    id: 6,
    image: image4,
    title: "Nacim Haddad en tournée à Oujda",
    location: "Oujda, Théâtre Mohammed 6",
    time: "01 | 20 h 49 m 45 s",
    price: "250MAD",
    status: "J'achète",
    
  },
  // ... you can include all your events here
];

const theme = {
  primary: "#F4E029",
  secondary: "#060B47",
  background: "#FFFFFF",
  text: "#000000",
  price: "#FF1F44",
  icons: "#1E90FF",
};

const ManageEvents = () => {
  const navigate = useNavigate();

  const handleModify = (eventId) => {
    navigate(`/app/edit-event/${eventId}`);
  };

  const handleDelete = (eventId) => {
    // Add delete confirmation and logic here
    console.log(`Delete event ${eventId}`);
  };

  const handleAddEvent = () => {
    navigate('/admin/events/create');
  };

  return (
    <Box
      sx={{
        p: 3,
        ml: "220px",
        width: "calc(100% - 220px)",
        backgroundColor: theme.background,
        minHeight: "100vh",
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          color: theme.text, 
          fontWeight: "bold",
          mb: 4,
          textAlign: "center"
        }}
      >
        Modifier les Événements
      </Typography>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} key={event.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }
              }}
            >
              {/* Event Image */}
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: "200px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              {/* Event Details */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ 
                    color: theme.text, 
                    fontWeight: "bold", 
                    mb: 1,
                    fontSize: '1.2rem'
                  }}
                >
                  {event.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 4, mb: 1 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon sx={{ color: theme.icons }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon sx={{ color: theme.icons }} />
                    <Typography variant="body2">{event.time}</Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{ 
                    color: theme.price, 
                    fontWeight: "bold",
                    fontSize: '1.1rem'
                  }}
                >
                  Prix: {event.price}
                </Typography>
              </Box>

              {/* Modify Button with enhanced styling */}
              <Button
                onClick={() => handleModify(event.id)}
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  bgcolor: theme.secondary,
                  color: '#fff',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#0A1067',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 15px rgba(6,11,71,0.3)',
                  }
                }}
              >
                Modifier
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageEvents; 