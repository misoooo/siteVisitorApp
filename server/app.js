// app.js
const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/form");
const siteRoutes = require('./routes/site');
const dashboardRoutes = require("./routes/dashboard");
const agentRoutes = require("./routes/agent");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", formRoutes); // routes at /api/submit
app.use('/api/sites', siteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/agents", agentRoutes);


module.exports = app;
