import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import image1 from "../../assets/images/event-1.jpg";
import image2 from "../../assets/images/event-2.jpg";
import image3 from "../../assets/images/event-3.jpg";
import image5 from "../../assets/images/event-5.jpg";
import image6 from "../../assets/images/event-6.jpg";
import image4 from "../../assets/images/event-4.jpg";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

// Theme colors
const theme = {
  primary: "#F4E029", // Yellow
  secondary: "#060B47", // Dark Blue
  background: "#FFFFFF", // White background
  text: "#000000", // Black text
  price: "#FF1F44", // Red for price
  submit: "#000000", // Black for button text
  icons: "#1E90FF", // Blue for icons
};

const defaultEvents = [
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
];

const EventComponent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les événements une seule fois au montage du composant
    const storedEvents = JSON.parse(localStorage.getItem('newEvents') || '[]');
    const allEvents = [...defaultEvents, ...storedEvents];
    setEvents(allEvents);
  }, []); // Dépendances vides pour n'exécuter qu'une seule fois

  const handleEventClick = () => {
    navigate("/app/event-details");
  };

  return (
    <Box
      sx={{
        p: 3,
        ml: "220px", // Add left margin to account for the sidebar width
        width: "calc(100% - 220px)", // Adjust width to fit the remaining space
        backgroundColor: theme.background, // White background
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  backgroundColor: theme.background,
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                }}
              >
                {/* Event Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Box sx={{ p: 3 }}>
                  {/* Event Title */}
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: theme.text, fontWeight: "bold" }}
                  >
                    {event.title}
                  </Typography>

                  {/* Event Location */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ mb: 1, color: theme.text }}
                  >
                    <LocationOnIcon sx={{ color: theme.icons }} />
                    <Typography variant="body1">{event.location}</Typography>
                  </Box>

                  {/* Event Time */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ mb: 2, color: theme.text }}
                  >
                    <AccessTimeIcon sx={{ color: theme.icons }} />
                    <Typography variant="body1">{event.time}</Typography>
                  </Box>

                  {/* Event Price */}
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: theme.text, fontWeight: "bold" }}
                    >
                      À partir de :
                    </Typography>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ color: theme.price, fontWeight: "bold" }}
                    >
                      {event.price}
                    </Typography>
                  </Box>

                  {/* Event Button */}
                  <Button
                    onClick={() => handleEventClick()}
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor:
                        event.status === "Guichet Fermé" ? "#FF6347" : theme.primary,
                      color: theme.submit,
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor:
                          event.status === "Guichet Fermé" ? "#FF6347" : theme.primary, // Remove hover effect
                      },
                    }}
                    disabled={event.status === "Guichet Fermé"}
                  >
                    {event.status}
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventComponent;