const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
require("dotenv").config();
const keys = require('../service-account.json')

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ]
});

const sheets = google.sheets({ version: 'v4', auth });


// 📊 Get aggregated dashboard stats
router.get("/", async (req, res) => {
  try {
    // const auth = new google.auth.OAuth2(
    //   process.env.CLIENT_ID,
    //   process.env.CLIENT_SECRET,
    //   process.env.REDIRECT_URI
    // );
    // auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    // const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A1:Z",
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return res.json({});

    const headers = rows[0];
    const dataRows = rows.slice(1).map((row) =>
      headers.reduce((obj, header, idx) => {
        obj[header.trim()] = row[idx] || "";
        return obj;
      }, {})
    );

    // Keep only the latest entry per unique Address
    const latestPerAddress = {};
    dataRows.forEach((entry) => {
      const key = entry.Address.trim();
      const date = new Date(entry.Date);
      if (!latestPerAddress[key] || date > new Date(latestPerAddress[key].Date)) {
        latestPerAddress[key] = entry;
      }
    });

    const latestEntries = Object.values(latestPerAddress);

    // Apply optional date range filter
    const { start, end } = req.query; // format YYYY-MM-DD
    let filtered = latestEntries;
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      filtered = latestEntries.filter(
        (e) => new Date(e.Date) >= startDate && new Date(e.Date) <= endDate
      );
    }

    // Calculate stats
    const totalSites = filtered.length;
    const showroomVisits = filtered.filter((e) => e.Visited.toLowerCase() === "yes").length;
    const purchasedCount = filtered.filter((e) => e.Purchased.toLowerCase() === "yes").length;

    // Agent-wise stats
    const agentStats = {};
    filtered.forEach((e) => {
      const agent = e.Agent || "Unknown";
      if (!agentStats[agent]) {
        agentStats[agent] = { total: 0, visited: 0, purchased: 0 };
      }
      agentStats[agent].total++;
      if (e.Visited.toLowerCase() === "yes") agentStats[agent].visited++;
      if (e.Purchased.toLowerCase() === "yes") agentStats[agent].purchased++;
    });

    res.json({
      totalSites,
      showroomVisits,
      purchasedCount,
      purchaseRate: showroomVisits ? ((purchasedCount / showroomVisits) * 100).toFixed(1) : 0,
      agentStats,
      entries: filtered,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
