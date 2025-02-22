import React from "react";
import { Box, Grid, Typography, Paper, Avatar } from "@mui/material";
import { Event, People, MonetizationOn, EmojiEmotions, WavingHand } from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const barChartData = [
  { name: "Jan", events: 12 },
  { name: "Feb", events: 19 },
  { name: "Mar", events: 3 },
  { name: "Apr", events: 5 },
  { name: "May", events: 2 },
  { name: "Jun", events: 3 },
];

const lineChartData = [
  { name: "Jan", revenue: 1000 },
  { name: "Feb", revenue: 2000 },
  { name: "Mar", revenue: 1500 },
  { name: "Apr", revenue: 3000 },
  { name: "May", revenue: 2500 },
  { name: "Jun", revenue: 4000 },
];

const pieChartData = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Cancelled", value: 10 },
];

// Colors for the pie chart
const COLORS = ["#36A2EB", "#FFCE56", "#FF6384"];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
};

// Futuristic blue theme colors
const theme = {
  primary: "#1E90FF", // Dodger Blue
  secondary: "#00BFFF", // Deep Sky Blue
  background: "#0A1929", // Dark Blue Background
  boxBackground: "#FFFFFF", // White background for boxes
  text: "#000000", // Black text for boxes
  accent: "#00FFFF", // Cyan accent
};

const Dashboard1 = () => {
  return (
    <Box
      sx={{
        p: 3,
        mt: "-35px",
        ml: "220px", // Add left margin to account for the sidebar width
        width: "calc(100% - 210px)", // Adjust width to fit the remaining space
        backgroundColor: theme.background, // Dark blue background
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        {/* ------------------------- Welcome Section ------------------------- */}
        <Grid item xs={12}>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    bgcolor: theme.primary,
                    width: 56,
                    height: 56,
                    boxShadow: `0 0 10px ${theme.accent}`,
                  }}
                >
                  <EmojiEmotions sx={{ fontSize: 40, color: theme.boxBackground }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: theme.text, fontWeight: "bold" }}
                  >
                    Welcome Admin!{" "}
                    <WavingHand sx={{ fontSize: 40, color: theme.primary }} />
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: theme.text }}>
                    Here's an overview of your events and activities.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Event
                  sx={{ fontSize: 40, color: theme.primary, mr: 2, filter: "drop-shadow(0 0 5px rgba(30, 144, 255, 0.8))" }}
                />
                <Typography variant="h5" sx={{ color: theme.text }}>
                  Total Events
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: theme.primary }}>
                45
              </Typography>
              <Typography variant="subtitle2" sx={{ color: theme.text }}>
                +5% from last month
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={4}>
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <People
                  sx={{ fontSize: 40, color: theme.secondary, mr: 2, filter: "drop-shadow(0 0 5px rgba(0, 191, 255, 0.8))" }}
                />
                <Typography variant="h5" sx={{ color: theme.text }}>
                  Attendees
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: theme.secondary }}>
                1,200
              </Typography>
              <Typography variant="subtitle2" sx={{ color: theme.text }}>
                +10% from last month
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={4}>
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <MonetizationOn
                  sx={{ fontSize: 40, color: theme.accent, mr: 2, filter: "drop-shadow(0 0 5px rgba(0, 255, 255, 0.8))" }}
                />
                <Typography variant="h5" sx={{ color: theme.text }}>
                  Revenue
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: theme.accent }}>
                $15,000
              </Typography>
              <Typography variant="subtitle2" sx={{ color: theme.text }}>
                +15% from last month
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={6}>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: theme.text }}>
                Events Overview
              </Typography>
              <Box sx={{ overflowX: "auto" }}>
                <BarChart width={500} height={300} data={barChartData}>
                  <XAxis dataKey="name" stroke={theme.text} />
                  <YAxis stroke={theme.text} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" fill={theme.primary} />
                </BarChart>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: theme.text }}>
                Revenue Trends
              </Typography>
              <Box sx={{ overflowX: "auto" }}>
                <LineChart width={500} height={300} data={lineChartData}>
                  <XAxis dataKey="name" stroke={theme.text} />
                  <YAxis stroke={theme.text} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={theme.accent}
                    strokeWidth={2}
                  />
                </LineChart>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* ------------------------- row 3 ------------------------- */}
        <Grid item xs={12} lg={6}>
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: theme.text }}>
                Event Status
              </Typography>
              <Box sx={{ overflowX: "auto" }}>
                <PieChart width={400} height={280}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 4,
                backgroundColor: theme.boxBackground, // White background
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: theme.text }}>
                Recent Activities
              </Typography>
              <Box>
                <Typography variant="body1" sx={{ color: theme.text }}>
                  - Event "Tech Conference" completed.
                </Typography>
                <Typography variant="body1" sx={{ color: theme.text }}>
                  - New event "Music Festival" added.
                </Typography>
                <Typography variant="body1" sx={{ color: theme.text }}>
                  - 50 new attendees registered.
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;