import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import Menuitems from "./data";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icon for dropdown
import ExpandLessIcon from "@mui/icons-material/ExpandLess"; // Icon for collapse
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Icon for Add Event
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"; // Icon for Remove Event
import EditIcon from "@mui/icons-material/Edit"; // Icon for Modify Event

const Sidebar = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const [openManageEvent, setOpenManageEvent] = useState(false); // State for dropdown
  const userRole = localStorage.getItem('userRole'); // Récupérer le rôle de l'utilisateur

  const handleManageEventClick = () => {
    setOpenManageEvent(!openManageEvent); // Toggle dropdown
  };

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      <Link to="/">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LogoIcon />
        </Box>
      </Link>

      <Box>
        <List sx={{ mt: 4, width: "200px" }}> {/* Set a fixed width for the List */}
          {Menuitems.map((item, index) => {
            // Ne pas afficher les options de gestion pour les clients
            if (userRole === 'client' && (item.title === "Manage Event" || item.title === "Manage Organization")) {
              return null;
            }

            if (item.title === "Manage Event" && userRole === 'admin') {
              return (
                <React.Fragment key={item.title}>
                  <ListItem
                    button
                    onClick={handleManageEventClick} // Handle dropdown click
                    sx={{
                      mb: 1,
                      width: "100%", // Take full width of the parent List
                      color: "black", // Default text color
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "black" }}> {/* Ensure icon is black */}
                      <item.icon width="20" height="20" />
                    </ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                    {openManageEvent ? <ExpandLessIcon /> : <ExpandMoreIcon />} {/* Dropdown icon */}
                  </ListItem>
                  <Collapse in={openManageEvent} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ width: "100%" }}> {/* Ensure sub-elements take full width */}
                      {/* Sub-elements for Manage Event */}
                      <ListItem
                        button
                        component={NavLink}
                        to="/app/add-event"
                        sx={{
                          pl: 2, // Reduced padding
                          width: "100%", // Take full width of the parent List
                          color: "black",
                          "&.active": {
                            color: "white",
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.main}!important`,
                          },
                          "&:hover": {
                            backgroundColor: (theme) => theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "black", minWidth: "36px" }}> {/* Reduced icon size */}
                          <AddCircleOutlineIcon fontSize="small" /> {/* Smaller icon */}
                        </ListItemIcon>
                        <ListItemText primary="Add Event" sx={{ fontSize: "0.875rem" }} /> {/* Smaller text */}
                      </ListItem>
                      <ListItem
                        button
                        component={NavLink}
                        to="/app/remove-event"
                        sx={{
                          pl: 2, // Reduced padding
                          width: "100%", // Take full width of the parent List
                          color: "black",
                          "&.active": {
                            color: "white",
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.main}!important`,
                          },
                          "&:hover": {
                            backgroundColor: (theme) => theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "black", minWidth: "36px" }}> {/* Reduced icon size */}
                          <RemoveCircleOutlineIcon fontSize="small" /> {/* Smaller icon */}
                        </ListItemIcon>
                        <ListItemText primary="Remove Event" sx={{ fontSize: "0.875rem" }} /> {/* Smaller text */}
                      </ListItem>
                      <ListItem
                        button
                        component={NavLink}
                        to="/app/modify-event"
                        sx={{
                          pl: 2, // Reduced padding
                          width: "100%", // Take full width of the parent List
                          color: "black",
                          "&.active": {
                            color: "white",
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.main}!important`,
                          },
                          "&:hover": {
                            backgroundColor: (theme) => theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "black", minWidth: "36px" }}> {/* Reduced icon size */}
                          <EditIcon fontSize="small" /> {/* Smaller icon */}
                        </ListItemIcon>
                        <ListItemText primary="Modify Event" sx={{ fontSize: "0.875rem" }} /> {/* Smaller text */}
                      </ListItem>
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            } else {
              return (
                <ListItem
                  button
                  component={NavLink}
                  to={item.href}
                  key={item.title}
                  sx={{
                    mb: 1,
                    width: "100%", // Take full width of the parent List
                    color: "black", // Default text color
                    "&.active": {
                      color: "white",
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}!important`,
                    },
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                    // Apply active styles if the current path matches href or href2
                    ...((pathDirect === item.href || pathDirect === item.href2) && {
                      color: "white",
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}!important`,
                    }),
                  }}
                  activeClassName="active"
                >
                  <ListItemIcon
                    sx={{
                      color:
                        pathDirect === item.href || pathDirect === item.href2
                          ? "white"
                          : "black", // Ensure icon is black unless active
                    }}
                  >
                    <item.icon width="20" height="20" />
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItem>
              );
            }
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={true}
      PaperProps={{
        sx: {
          width: SidebarWidth,
          boxShadow: 10,
        },
      }}
      variant="persistent"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;