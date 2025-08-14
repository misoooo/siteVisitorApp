// routes/agent.js
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

// ✅ GET Unique Agent Names
router.get("/", async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A1:Z" // Adjust range to include your Agent column
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return res.json([]);

    const headers = rows[0];
    const agentIndex = headers.indexOf("Agent");
    if (agentIndex === -1) {
      return res.status(400).json({ error: "Agent column not found" });
    }
   
    const uniqueAgents = [...new Set(rows.slice(1)
      .map(row => row[agentIndex]?.trim())
      .filter(name => name && name.toLowerCase() !== "unknown"))];

    res.json(uniqueAgents);
  } catch (err) {
    console.error("Error fetching agent names:", err);
    res.status(500).json({ error: "Failed to fetch agent names" });
  }
});

module.exports = router;
