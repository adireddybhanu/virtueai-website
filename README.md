# VirtueAI website

Static site for virtueai.co.uk. No build step — `index.html`, `css/styles.css`, `js/script.js`, `assets/img/`.

## Connect the "Submit your problem" form to a Google Sheet

The sheet already exists — **"VirtueAI Enquiries"** in your Google Drive
(https://docs.google.com/spreadsheets/d/1zFgwipsAyYUYvzhiy2481hiJ6niaKW0tLlPLUIxmTes/edit),
with headers already in row 1: `Date | Name | Email | Phone | Problem`.

The form on the site opens a pre-filled email as a backup, but to also log every
submission with a date into that sheet, do this once:

1. Open the sheet linked above. Go to **Extensions → Apps Script**. Delete the placeholder
   code and paste this in:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     sheet.appendRow([new Date(), e.parameter.name, e.parameter.email, e.parameter.phone, e.parameter.problem]);
     return ContentService.createTextOutput("OK");
   }
   ```

2. Click **Deploy → New deployment**. Click the gear icon next to "Select type" and choose
   **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
3. Click **Deploy**. Google will ask you to authorize the script — click **Authorize access**,
   pick your Google account, then (since it's your own unpublished script) click
   **Advanced → Go to \[project name\] (unsafe)** → **Allow**. This is safe; it's just Google
   being cautious about scripts that weren't reviewed by them.
4. Copy the **Web app URL** it gives you (ends in `/exec`).
5. Send that URL to Claude (or paste it yourself into `js/script.js`, replacing
   `PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` on the `SHEET_ENDPOINT` line), then commit,
   push, and redeploy (`vercel --prod --yes --project virtueai-website`).

Every future form submission will then land as a new row in the sheet automatically, with
the date it came in — no Google account login needed by the visitor.
