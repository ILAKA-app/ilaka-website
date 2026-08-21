/**
 * Ilaka waitlist backend — Google Apps Script Web App.
 *
 * Setup:
 *   1. https://sheets.google.com → new blank Sheet (e.g. "Ilaka Waitlist").
 *   2. Extensions → Apps Script. Delete the placeholder code, paste this file.
 *   3. Deploy → New deployment → gear icon → type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *   4. Deploy → authorize when prompted → copy the "Web app URL" (ends /exec).
 *   5. Paste that URL into WAITLIST_ENDPOINT in index.html.
 *
 * Re-deploying after edits: Deploy → Manage deployments → edit (pencil) →
 * "New version" → Deploy. The /exec URL stays the same across versions.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var email = String(data.email || "").trim().toLowerCase();
    var role = String(data.role || "").trim();
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRe.test(email)) {
      return jsonOut({ ok: false, error: "invalid_email" });
    }

    var sheet = getSheet();
    var existing = sheet.getLastRow() > 1
      ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat()
      : [];

    if (existing.indexOf(email) === -1) {
      sheet.appendRow([new Date(), email, role, "ilaka.co.in"]);
    }

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return jsonOut({ ok: true, status: "alive" });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Waitlist");
  if (!sheet) {
    sheet = ss.insertSheet("Waitlist");
    sheet.appendRow(["Timestamp", "Email", "Role", "Source"]);
  }
  return sheet;
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
