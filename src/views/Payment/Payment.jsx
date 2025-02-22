import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  Fade,
  Backdrop,
} from "@mui/material";
import {
  CreditCard,
  Lock,
  EventSeat,
  CalendarMonth,
  SecurityOutlined,
} from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Import card images
import visaImage from "../../assets/images/visa.png";
import mastercardImage from "../../assets/images/mastercard.png";
import cmiImage from "../../assets/images/cmi.png";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);

  const theme = {
    primary: "#F4E029", // Yellow
    secondary: "#060B47", // Dark Blue
    accent: "#FF1F44", // Red
    background: "#FFFFFF",
    text: "#000000",
    success: "#4CAF50",
  };

  useEffect(() => {
    // Récupérer les détails du paiement
    const details = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
    setPaymentDetails(details);
  }, []);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Simuler un traitement de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLoading(false);
      setSuccess(true);

      // Attendre que l'animation de succès soit visible
      setTimeout(() => {
        navigate('/app/event');
      }, 2000);

    } catch (error) {
      setLoading(false);
      console.error('Erreur de paiement:', error);
    }
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
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            color: theme.secondary,
          }}
        >
          Paiement Sécurisé
        </Typography>

        {/* Order Summary */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mb: 4,
            backgroundColor: "#f8f9fa",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EventSeat sx={{ color: theme.accent, mr: 1 }} />
            <Typography variant="h6">Résumé de la commande</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>{paymentDetails?.eventTitle}</Typography>
            <Typography variant="h6" sx={{ color: theme.accent }}>
              {paymentDetails?.eventPrice}
            </Typography>
          </Box>
        </Paper>

        {/* Payment Methods */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Méthodes de paiement acceptées
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
            <img src={visaImage} alt="Visa" style={{ height: 40 }} />
            <img src={mastercardImage} alt="Mastercard" style={{ height: 40 }} />
            <img src={cmiImage} alt="CMI" style={{ height: 40 }} />
          </Box>
        </Box>

        {/* Credit Card Form */}
        <form onSubmit={handleCardSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              fullWidth
              label="Numéro de carte"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard sx={{ color: theme.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: theme.secondary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Date d'expiration"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth sx={{ color: theme.secondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.secondary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.secondary,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SecurityOutlined sx={{ color: theme.secondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.secondary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.secondary,
                    },
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Nom sur la carte"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: theme.secondary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.secondary,
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<Lock />}
              sx={{
                bgcolor: theme.primary,
                color: theme.text,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: theme.secondary,
                  color: "#fff",
                },
              }}
            >
              Payer {paymentDetails?.eventPrice} MAD
            </Button>
          </Box>
        </form>

        {/* Security Notice */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
            gap: 1,
            color: "text.secondary",
          }}
        >
          <Lock fontSize="small" />
          <Typography variant="body2">
            Paiement sécurisé avec cryptage SSL 256-bits
          </Typography>
        </Box>
      </Paper>

      {/* Loading et Success Animations */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          gap: 2
        }}
        open={loading || success}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : success ? (
          <Fade in={success}>
            <Box sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 60, color: '#4CAF50' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Paiement effectué avec succès!
              </Typography>
            </Box>
          </Fade>
        ) : null}
      </Backdrop>
    </Box>
  );
};

export default Payment; 