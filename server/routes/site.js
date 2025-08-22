// // routes/site.js

// const express = require('express');
// const router = express.Router();
// const { google } = require('googleapis');
// require('dotenv').config();

// const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
// const SHEET_NAME = 'Sheet1'; // adjust to your sheet name

// // Setup OAuth2 just like form.js
// const auth = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );
// auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// router.get('/', async (req, res) => {
//   try {
//     const sheets = google.sheets({ version: 'v4', auth });
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: `${SHEET_NAME}!A1:Z`,
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length < 2) return res.json([]);

//     const headers = rows[0];
//     const data = rows.slice(1).map(row => {
//       const entry = {};
//       headers.forEach((key, i) => {
//         entry[key.charAt(0).toLowerCase() + key.slice(1)] = row[i] || '';
//       });
//       return entry;
//     });

//     res.json(data);
//   } catch (err) {
//     console.error('Error fetching site list:', err);
//     res.status(500).json({ error: 'Failed to fetch site list' });
//   }
// });

// module.exports = router;


// ✅ Updated site.js (routes/site.js)
// const express = require('express');
// const router = express.Router();
// const { google } = require('googleapis');
// const auth = require('../googleSheetsService');

// const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
// const SHEET_NAME = 'Sheet1';

// // GET unique sites with latest data or fresh siteID
// router.get('/', async (req, res) => {
//   try {
//     const sheets = google.sheets({ version: 'v4', auth });
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: `${SHEET_NAME}!A1:Z`,
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length < 2) return res.json({ dropdown: [], siteMap: {}, newSiteID: "c0" });

//     const headers = rows[0];
//     const entries = rows.slice(1).map(row => {
//       const obj = {};
//       headers.forEach((h, i) => {
//         obj[h.trim()] = row[i] || "";
//       });
//       return obj;
//     });

//     // ✅ Unique dropdown (SiteID + Address)
//     const uniqueMap = new Map();
//     for (let entry of entries) {
//       const key = `${entry.SiteID} - ${entry.Address}`;
//       if (!uniqueMap.has(key)) uniqueMap.set(key, entry);
//     }

//     // ✅ Prefill map (latest entry per SiteID)
//     const siteMap = {};
//     for (let entry of entries) {
//       const id = entry.SiteID;
//       if (!siteMap[id] || new Date(entry.Date) > new Date(siteMap[id].Date)) {
//         siteMap[id] = entry;
//       }
//     }

//     // ✅ Next fresh SiteID (based on max cN)
//     const freshSiteIDs = entries.filter(e => e.Revisit === "Fresh" && /^c\d+$/.test(e.SiteID));
//     const maxNum = freshSiteIDs.reduce((max, e) => {
//       const num = parseInt(e.SiteID.slice(1));
//       return isNaN(num) ? max : Math.max(max, num);
//     }, -1);
//     const newSiteID = `c${maxNum + 1}`;

//     return res.json({
//       dropdown: Array.from(uniqueMap.keys()),
//       siteMap,
//       newSiteID
//     });

//   } catch (err) {
//     console.error('Error fetching sites:', err);
//     res.status(500).json({ error: 'Failed to fetch site list' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const { google } = require('googleapis');
// const router = express.Router();
// const auth = require('../auth'); // Your Google Auth helper

// // GET /api/sites — returns only latest entry for each unique SiteID
// router.get('/', async (req, res) => {
//   try {
//     const sheets = google.sheets({ version: 'v4', auth });
//     const spreadsheetId = process.env.SHEET_ID;

//     const range = 'Sheet1'; // Adjust if needed
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range,
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length === 0) return res.status(200).json([]);

//     const headers = rows[0];
//     const dataRows = rows.slice(1);

//     const siteMap = {};

//     dataRows.forEach(row => {
//       const entry = Object.fromEntries(headers.map((h, i) => [h, row[i] || '']));
//       const id = entry.SiteID;

//       if (!siteMap[id] || new Date(entry.date) > new Date(siteMap[id].date)) {
//         siteMap[id] = entry; // keep the latest one
//       }
//     });

//     const latestSites = Object.values(siteMap);
//     res.status(200).json(latestSites);
//   } catch (error) {
//     console.error('Error fetching latest site entries:', error);
//     res.status(500).json({ error: 'Failed to fetch sites' });
//   }
// });

// module.exports = router;


// const express = require("express");
// const { google } = require("googleapis");
// const router = express.Router();
// //const auth = require("../auth"); // OAuth2 client
// const getOAuthClient = require("../auth/googleOAuthClient");


// // GET latest entry per site
// // router.get("/sites", async (req, res) => {
// //   try {
// //     const sheets = google.sheets({ version: "v4", auth });
// //     const spreadsheetId = process.env.SPREADSHEET_ID;

// //     const response = await sheets.spreadsheets.values.get({
// //       spreadsheetId,
// //       range: "Sheet1",
// //     });

// //     const rows = response.data.values;
// //     const headers = rows[0];
// //     const data = rows.slice(1).map((row) =>
// //       Object.fromEntries(headers.map((h, i) => [h, row[i] || ""]))
// //     );

// //     // Keep latest entry per SiteID
// //     const latestPerSite = {};
// //     for (const row of data) {
// //       const siteID = row.SiteID;
// //       const date = row.date;
// //       if (
// //         !latestPerSite[siteID] ||
// //         new Date(date) > new Date(latestPerSite[siteID].date)
// //       ) {
// //         latestPerSite[siteID] = row;
// //       }
// //     }

// //     res.json(Object.values(latestPerSite));
// //   } catch (error) {
// //     console.error("Error fetching site data:", error);
// //     res.status(500).send("Failed to fetch sites");
// //   }
// // });

// // routes/sites.js
// router.get('/sites', async (req, res) => {
//   try {
//     const auth = getOAuthClient();
// const sheets = google.sheets({ version: "v4", auth });
// const spreadsheetId = process.env.SPREADSHEET_ID;
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: 'Form Responses 1!A1:Z',
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length === 0) return res.json([]);

//     const headers = rows[0];
//     const siteIDIndex = headers.indexOf('SiteID');
//     const addressIndex = headers.indexOf('address');
//     const revisitIndex = headers.indexOf('revisit');

//     const seen = new Set();
//     const uniqueFreshSites = [];

//     for (let i = rows.length - 1; i > 0; i--) {
//       const row = rows[i];
//       const siteId = row[siteIDIndex];
//       const address = row[addressIndex];
//       const revisit = row[revisitIndex];

//       const key = `${siteId}-${address}`;
//       if (!seen.has(key) && (revisit === '' || revisit.toLowerCase() === 'no')) {
//         seen.add(key);
//         uniqueFreshSites.push({ siteId, address });
//       }
//     }

//     res.json(uniqueFreshSites);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching sites');
//   }
// });


// // ✅ Route 2: Get latest entry for selected SiteID
// router.get('/sites/latest/:siteId', async (req, res) => {
//   const { siteId } = req.params;
//   try {
//     //const auth = getOAuthClient();
//     const auth = getOAuthClient();
// const sheets = google.sheets({ version: "v4", auth });

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: 'Form Responses 1!A1:Z',
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length === 0) return res.json(null);

//     const headers = rows[0];
//     const siteIDIndex = headers.indexOf('SiteID');

//     const matchingRows = rows
//       .slice(1)
//       .filter(row => row[siteIDIndex] === siteId);

//     const latestRow = matchingRows[matchingRows.length - 1];
//     const latestEntry = {};

//     headers.forEach((header, idx) => {
//       latestEntry[header] = latestRow[idx] || '';
//     });

//     res.json(latestEntry);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching latest site entry');
//   }
// });


// // POST form submission
// router.post("/submit", async (req, res) => {
//   try {
//     const auth = getOAuthClient();
//     const sheets = google.sheets({ version: "v4", auth });
//     const spreadsheetId = process.env.SPREADSHEET_ID;
//     const formData = req.body;

//     // Get headers
//     const headersResponse = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Sheet1!A1:Z1",
//     });
//     const headers = headersResponse.data.values[0];
//     const row = headers.map((key) => formData[key] || "");

//     // Append row
//     await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range: "Sheet1",
//       valueInputOption: "USER_ENTERED",
//       resource: { values: [row] },
//     });

//     res.json({ message: "Submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     res.status(500).json({ message: "Submission failed" });
//   }
// });

// module.exports = router;


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

// ✅ Route 1: Get all unique fresh sites
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

    console.log(`home ${response}`)
    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return res.status(404).json({ message: "No site data found" });
    }
     

    
    const headers = rows[0];
    const siteIDIndex = headers.indexOf("SiteID");
    const addressIndex = headers.indexOf("Address");
    const revisitIndex = headers.indexOf("Revisit");


//     console.log("Total rows:", rows.length);
// console.log("Headers:", headers);
// console.log("Sample row:", rows[1]);


    if (siteIDIndex === -1 || addressIndex === -1 || revisitIndex === -1) {
      return res.status(500).json({ message: "Required columns not found in Sheet1" });
    }
    const seen = new Set();
    const uniqueFreshSites = [];

    for (let i = rows.length - 1; i > 0; i--) {
      const row = rows[i];
      const siteId = row[siteIDIndex];
      const address = row[addressIndex];
      const revisit = (row[revisitIndex] || "").toLowerCase().trim();

      const key = `${siteId}-${address}`;
      if (!seen.has(key) && revisit === "fresh") {
        seen.add(key);
        uniqueFreshSites.push({ siteId, address });
      }
    }

    res.json(uniqueFreshSites);
  } catch (err) {
    console.error("Error fetching fresh sites:", err);
    res.status(500).send("Failed to fetch sites");
  }
});




//route to get info from selected site ID
// site.js
router.get("/:siteId/latest", async (req, res) => {
  const { siteId } = req.params;

  try {
    // const auth = new google.auth.OAuth2(
    //   process.env.CLIENT_ID,
    //   process.env.CLIENT_SECRET,
    //   process.env.REDIRECT_URI
    // );
    // auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    // const sheets = google.sheets({ version: "v4", auth });

    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1",
    });

    const rows = sheetData.data.values;
    const headers = rows[0];
    const dataRows = rows.slice(1);

    const siteRows = dataRows
      .map((row) =>
        headers.reduce((obj, header, i) => {
          obj[header.trim()] = row[i] || "";
          return obj;
        }, {})
      )
      .filter((row) => row["SiteID"] === siteId);

    if (!siteRows.length) {
      return res.json({});
    }
     console.log(`siteId-latest, ${res}`)
    // Sort by Date (descending)
    siteRows.sort((a, b) => new Date(b["Date"]) - new Date(a["Date"]));

    res.json(siteRows[0]);
  } catch (err) {
    console.error("Error fetching latest site entry:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Route 2: Get latest entry for a given SiteID
router.get("/latest/:siteId", async (req, res) => {
  const { siteId } = req.params;
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
    if (!rows || rows.length < 2) return res.json(null);

    const headers = rows[0];
    const siteIDIndex = headers.indexOf("SiteID");
    const dateIndex = headers.indexOf("Date");
    if (siteIDIndex === -1 || dateIndex === -1) {
      return res.status(500).json({ message: "Required columns not found" });
    }

    const matchingRows = rows.slice(1)
      .filter(row => row[siteIDIndex] === siteId)
      .sort((a, b) => new Date(a[dateIndex]) - new Date(b[dateIndex]));

    if (matchingRows.length === 0) return res.json(null);

    const latestRow = matchingRows[matchingRows.length - 1];
    const latestEntry = {};
    headers.forEach((header, idx) => {
      latestEntry[header] = latestRow[idx] || "";
    });
     
    res.json(latestEntry);
    console.log("latest-siteId",latestEntry)
  } catch (err) {
    console.error("Error fetching latest site entry:", err);
    res.status(500).send("Failed to fetch latest site entry");
  }
});

// ✅ Route 3: Submit new site entry to Sheet1
router.post("/submit", async (req, res) => {
  const formData = req.body;

  try {
    // const auth = new google.auth.OAuth2(
    //   process.env.CLIENT_ID,
    //   process.env.CLIENT_SECRET,
    //   process.env.REDIRECT_URI
    // );

    // auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    // const sheets = google.sheets({ version: "v4", auth });

    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!1:1",
    });

    const headers = headerResponse.data.values[0];
    const row = headers.map(header => {
      const key = header.charAt(0).toLowerCase() + header.slice(1);
      return formData[key] || "";
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    res.status(200).json({ message: "Submitted successfully" });
    console.log("site.js")
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Submission failed" });
  }
});

//to get unique agent names


module.exports = router;

