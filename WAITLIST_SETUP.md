# Waitlist Backend Setup Guide

## Option 1: Google Sheets API (Recommended)

### Step 1: Create Google Sheet
1. Create a new Google Sheet
2. Add headers: `Email`, `Timestamp`
3. Share the sheet (make it editable by anyone with the link, or use service account)

### Step 2: Create Google Apps Script
1. Open Google Sheet → Extensions → Apps Script
2. Create a web app that accepts POST requests
3. Use this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([data.email, new Date()]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy as web app
5. Copy the web app URL

### Step 3: Update API Route
Update `src/api/waitlist.ts` with your Google Apps Script URL

---

## Option 2: Formspree (Easiest)

1. Go to https://formspree.io
2. Create a free account
3. Create a new form
4. Copy the form endpoint
5. Update `Hero.tsx` to use Formspree endpoint directly:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
})
```

---

## Option 3: Custom Backend (Node.js/Express)

Create a simple Express server:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;
  // Save to database or send email
  console.log('New waitlist signup:', email);
  res.json({ success: true });
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

---

## Quick Setup: Formspree (Recommended for MVP)

1. Sign up at formspree.io
2. Create form
3. Update Hero.tsx fetch URL to your Formspree endpoint
4. Done! You'll receive emails in your inbox

