import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Badge,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Import default avatar
import defaultAvatar from "../../../assets/images/profile-default.jpg";

const Header = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);
  
  // Charger l'avatar depuis le localStorage
  const [profileAvatar, setProfileAvatar] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      return profile.avatar || defaultAvatar;
    }
    return defaultAvatar;
  });

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      message: "Nouvelle réservation pour l'événement Hoba Hoba Spirit",
      time: "Il y a 5 minutes",
      isUrgent: true,
    },
    {
      id: 2,
      message: "Mise à jour du profil réussie",
      time: "Il y a 2 heures",
      isUrgent: false,
    },
    {
      id: 3,
      message: "Bienvenue sur votre tableau de bord",
      time: "Il y a 1 jour",
      isUrgent: false,
    },
  ];

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationEl(null);
  };

  const handleProfileNavigate = () => {
    navigate("/app/profile");
    handleClose();
  };

  const handleLogout = () => {
    navigate("/login");
    handleClose();
  };

  const theme = {
    primary: "#F4E029",
    secondary: "#060B47",
    accent: "#FF1F44",
    background: "#FFFFFF",
    text: "#000000",
  };

  // Mettre à jour l'avatar quand le composant est monté et quand le localStorage change
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setProfileAvatar(profile.avatar || defaultAvatar);
      }
    };

    // Écouter les changements du localStorage
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AppBar sx={{ ...props.sx, boxShadow: 3, bgcolor: 'white' }} elevation={0}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        {/* Notifications */}
        <IconButton
          size="large"
          onClick={handleNotificationClick}
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={3} color="error">
            <NotificationsNoneOutlinedIcon sx={{ color: theme.secondary }} />
          </Badge>
        </IconButton>

        {/* Notifications Popover */}
        <Popover
          open={Boolean(notificationEl)}
          anchorEl={notificationEl}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              width: 320,
              maxHeight: 400,
              mt: 1.5,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }
          }}
        >
          <Box sx={{ p: 2, bgcolor: theme.secondary, color: 'white' }}>
            <Typography variant="h6">Notifications</Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  sx={{ 
                    p: 2,
                    bgcolor: notification.isUrgent ? 'rgba(255,31,68,0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: notification.isUrgent ? 'rgba(255,31,68,0.15)' : 'rgba(0,0,0,0.04)',
                    }
                  }}
                >
                  <ListItemIcon>
                    {notification.isUrgent ? (
                      <ErrorOutlineIcon sx={{ color: theme.accent }} />
                    ) : (
                      <NotificationsNoneOutlinedIcon sx={{ color: theme.secondary }} />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={notification.message}
                    secondary={notification.time}
                    primaryTypographyProps={{
                      sx: { 
                        color: notification.isUrgent ? theme.accent : 'inherit',
                        fontWeight: notification.isUrgent ? 'bold' : 'normal'
                      }
                    }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Popover>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        {/* Profile - Removed yellow border */}
        <Button
          onClick={handleProfileClick}
          sx={{
            textTransform: 'none',
            p: 0.5,
            borderRadius: '50%',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.04)',
            }
          }}
        >
          <Avatar
            src={profileAvatar}
            sx={{
              width: 40,
              height: 40,
            }}
          />
        </Button>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 250,
              mt: 1.5,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleProfileNavigate} sx={{ py: 2 }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" sx={{ color: theme.secondary }} />
            </ListItemIcon>
            <Typography>Mon Profil</Typography>
          </MenuItem>
          <MenuItem sx={{ py: 2 }}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" sx={{ color: theme.secondary }} />
            </ListItemIcon>
            <Typography>Paramètres</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ py: 2, color: theme.accent }}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" sx={{ color: theme.accent }} />
            </ListItemIcon>
            <Typography>Déconnexion</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
