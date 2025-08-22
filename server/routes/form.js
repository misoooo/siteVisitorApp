// // routes/form.js
// const express = require("express");
// const router = express.Router();
// const { google } = require("googleapis");
// require("dotenv").config();

// router.post("/submit", async (req, res) => {
//   const formData = req.body;

//   try {
//     const auth = new google.auth.OAuth2(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       process.env.REDIRECT_URI
//     );

//     auth.setCredentials({
//       refresh_token: process.env.REFRESH_TOKEN,
//     });

//     const sheets = google.sheets({ version: "v4", auth });

//     const values = [[
//       formData.date,
//       formData.agent,
//       formData.role1,
//       formData.name1,
//       formData.phone1,
//       formData.role2,
//       formData.name2,
//       formData.phone2,
//       formData.revisit,
//       formData.area,
//       formData.stage,
//       formData.sqyd,
//       formData.subArea,
//       formData.address,
//       formData.remarks,
//       formData.followUp,
//       formData.lat,
//       formData.lng
//     ]];

//     await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: "Sheet1!A1",
//       valueInputOption: "USER_ENTERED",
//       requestBody: { values },
//     });

//     res.status(200).json({ message: "Form submitted successfully" });
//   } catch (error) {
//     console.error("Sheet append error:", error);
//     res.status(500).json({ message: "Failed to write to sheet" });
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


router.post("/submit", async (req, res) => {
  const formData = req.body;

  try {
    // Initialize OAuth2 client
    // const auth = new google.auth.OAuth2(
    //   process.env.CLIENT_ID,
    //   process.env.CLIENT_SECRET,
    //   process.env.REDIRECT_URI
    // );

    // // Use refresh token from .env
    // auth.setCredentials({
    //   refresh_token: process.env.REFRESH_TOKEN,
    // });

    // const sheets = google.sheets({ version: "v4", auth });

    // Get headers from first row (Sheet1!1:1)
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!1:1",
    });

    const headers = headerResponse.data.values[0]; // Array of column headers

    // Build row by matching formData to sheet headers
    const row = headers.map((header) => {
      const key = header.charAt(0).toLowerCase() + header.slice(1);
      return formData[key] || "";
    });

    // Append the row
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A1", // appends below last row
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    res.status(200).json({ message: "Form submitted successfully" });
    console.log("form.js")
  } catch (error) {
    console.error("Sheet append error:", error);
    res.status(500).json({ message: "Failed to write to sheet" });
  }
});

module.exports = router;
