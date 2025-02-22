import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Event, LocationOn, Schedule, AttachMoney, Phone } from "@mui/icons-material";

// Import the events data (temporary - should come from API)
import image1 from "../../assets/images/event-1.jpg";
import image2 from "../../assets/images/event-2.jpg";
import image3 from "../../assets/images/event-3.jpg";
import image4 from "../../assets/images/event-4.jpg";
import image5 from "../../assets/images/event-5.jpg";
import image6 from "../../assets/images/event-6.jpg";

const events = [
  {
    id: 1,
    image: image1,
    title: "Soirée 'IDYENAYEER' à Casablanca",
    location: "Casablanca, Complexe Al Hassani",
    time: "18:49",
    date: "2024-03-01",
    price: "200",
    contact: "+212 666-666666",
    description: "Une soirée exceptionnelle à ne pas manquer!",
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
  // ... add other events
];

const EditEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    price: "",
    contact: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Simulate fetching event data
    const event = events.find(e => e.id === parseInt(id));
    if (event) {
      setEventData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price,
        contact: event.contact,
        description: event.description,
        image: event.image,
      });
    }
  }, [id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEventData(prev => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log("Updated Event Data:", eventData);
    alert("Event updated successfully!");
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
        backgroundColor: "#FFFFFF",
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Event Image Upload */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
            width: "100%",
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
                width: "100%",
                border: "2px dashed #1976D2",
                borderRadius: "8px",
                p: 0,
              }}
            >
              <img
                src={eventData.image}
                alt="Event Preview"
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </IconButton>
          </label>
        </Box>

        {/* Event Title */}
        <TextField
          fullWidth
          label="Event Name"
          value={eventData.title}
          onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Event sx={{ color: "#1976D2" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Event Date */}
        <TextField
          fullWidth
          label="Event Date"
          type="date"
          value={eventData.date}
          onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Event sx={{ color: "#1976D2" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Event Time */}
        <TextField
          fullWidth
          label="Event Time"
          type="time"
          value={eventData.time}
          onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Schedule sx={{ color: "#1976D2" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Event Location */}
        <TextField
          fullWidth
          label="Event Location"
          value={eventData.location}
          onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn sx={{ color: "#1976D2" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Event Price */}
        <TextField
          fullWidth
          label="Event Price"
          type="number"
          value={eventData.price}
          onChange={(e) => setEventData(prev => ({ ...prev, price: e.target.value }))}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney sx={{ color: "#1976D2" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Event Contact */}
        <TextField
          fullWidth
          label="Contact Information"
          value={eventData.contact}
          onChange={(e) => setEventData(prev => ({ ...prev, contact: e.target.value }))}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone sx={{ color: "#1976D2" }} />
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
          value={eventData.description}
          onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
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
            backgroundColor: "#1976D2",
            color: "#FFFFFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#F4E029",
              color: "#000000",
            },
          }}
        >
          Update Event
        </Button>
      </Paper>
    </Box>
  );
};

export default EditEvent; 