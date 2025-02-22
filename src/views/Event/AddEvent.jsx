import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Event, LocationOn, Schedule, AttachMoney, Phone } from "@mui/icons-material"; // Icons for the form
import defaultImage from "../../assets/images/default-event.jpg"; // Import default image
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventContact, setEventContact] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(defaultImage); // Set default image
  const [alert, setAlert] = useState({ show: false, message: "", severity: "" });
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEventImage(URL.createObjectURL(file)); // Update the image with the uploaded file
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!eventName || !eventDate || !eventLocation || !eventPrice) {
      setAlert({
        show: true,
        message: "Veuillez remplir tous les champs obligatoires",
        severity: "error"
      });
      return;
    }

    try {
      // Récupérer les événements existants du localStorage
      const existingEvents = JSON.parse(localStorage.getItem('newEvents') || '[]');

      // Créer le nouvel événement
      const newEvent = {
        id: existingEvents.length + 7, // Pour continuer après les 6 événements existants
        image: eventImage,
        title: eventName,
        location: eventLocation,
        time: eventTime || "À déterminer",
        price: `${eventPrice}MAD`,
        status: "J'achète",
        description: eventDescription,
        contact: eventContact,
        date: eventDate
      };

      // Ajouter le nouvel événement à la liste
      existingEvents.push(newEvent);
      localStorage.setItem('newEvents', JSON.stringify(existingEvents));

      setAlert({
        show: true,
        message: "Événement ajouté avec succès!",
        severity: "success"
      });

      // Réinitialiser le formulaire
      setEventName("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
      setEventPrice("");
      setEventContact("");
      setEventDescription("");
      setEventImage(defaultImage);

      // Rediriger vers la liste des événements
      setTimeout(() => {
        navigate('/app/event');
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      setAlert({
        show: true,
        message: "Erreur lors de l'ajout de l'événement",
        severity: "error"
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "calc(100% - 220px)",
        ml: "230px",
        backgroundColor: "#FFFFFF", // White background
        p: 3,
      }}
    >
      <Paper
        elevation={6} // Add shadow
        sx={{
          p: 4,
          width: "100%",
          backgroundColor: "#FFFFFF", // White form background
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)", // Subtle shadow
        }}
      >

        {/* Event Image Upload */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
            width: "100%", // Ensure the container takes full width
          }}
        >
          <label htmlFor="event-image-upload" style={{ width: "100%" }}>
            <input
              id="event-image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <IconButton
              component="span"
              sx={{
                width: "100%", // Full width
                border: "2px dashed #1976D2", // Blue border
                borderRadius: "8px",
                p: 0,
              }}
            >
              <img
                src={eventImage}
                alt="Event Preview"
                style={{
                  width: "100%", // Full width
                  height: "300px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </IconButton>
          </label>
        </Box>

        {/* Event Name */}
        <TextField
          fullWidth
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2", // Blue border
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Black border on hover
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2", // Blue label
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Event sx={{ color: "#1976D2" }} /> {/* Blue icon */}
              </InputAdornment>
            ),
          }}
        />

        {/* Event Date */}
        <TextField
          fullWidth
          label="Event Date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2", // Blue border
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Black border on hover
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2", // Blue label
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Event sx={{ color: "#1976D2" }} /> {/* Blue icon */}
              </InputAdornment>
            ),
          }}
        />

        {/* Event Time */}
        <TextField
          fullWidth
          label="Event Time"
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2", // Blue border
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Black border on hover
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2", // Blue label
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Schedule sx={{ color: "#1976D2" }} /> {/* Blue icon */}
              </InputAdornment>
            ),
          }}
        />

        {/* Event Location */}
        <TextField
          fullWidth
          label="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2", // Blue border
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Black border on hover
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2", // Blue label
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn sx={{ color: "#1976D2" }} /> {/* Blue icon */}
              </InputAdornment>
            ),
          }}
        />

        {/* Event Price */}
        <TextField
          fullWidth
          label="Event Price"
          type="number"
          value={eventPrice}
          onChange={(e) => setEventPrice(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2", // Blue border
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Black border on hover
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2", // Blue label
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney sx={{ color: "#1976D2" }} /> {/* Blue icon */}
              </InputAdornment>
            ),
          }}
        />

        {/* Event Contact */}
        <TextField
          fullWidth
          label="Contact Information"
          value={eventContact}
          onChange={(e) => setEventContact(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2", // Blue border
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Black border on hover
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2", // Blue label
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone sx={{ color: "#1976D2" }} /> {/* Blue icon */}
              </InputAdornment>
            ),
          }}
        />

        {/* Event Description */}
        <TextField
          fullWidth
          label="Event Description"
          multiline
          rows={4}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2", // Blue border
              },
              "&:hover fieldset": {
                borderColor: "#000000", // Black border on hover
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2", // Blue label
            },
          }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 2,
            backgroundColor: "#1976D2", // Blue background
            color: "#FFFFFF", // White text
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#F4E029", // Black background on hover
              color: "#000000", // White text on hover
            },
          }}
        >
          Add Event
        </Button>
      </Paper>
    </Box>
  );
};

export default AddEvent;