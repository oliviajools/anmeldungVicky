const ADMIN_PASSCODE = 'Vicky1885!'; // <— bitte anpassen

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const body = JSON.parse(e.postData.contents);

    // Sicherheit: Felder whitelisten
    const now = new Date();
    const values = [
      now,
      body.kalenderwoche || '',
      body.kind_name?.trim() || '',
      body.eltern_name?.trim() || '',
      body.kontakt_email?.trim() || '',
      body.kontakt_tel?.trim() || '',
      body.mo_individualtraining ? true : false,
      body.do_hausaufgabenhilfe ? true : false,
      body.bemerkungen?.trim() || ''
    ];

    sheet.appendRow(values);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  
  if (action === 'list') {
    const pass = e.parameter.passcode || '';
    if (pass !== ADMIN_PASSCODE) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      const rows = sheet.getDataRange().getValues();
      const headers = rows.shift();
      const data = rows.map(r => Object.fromEntries(headers.map((h, i) => [String(h), r[i]])));
      
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true, data }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Service läuft' }))
    .setMimeType(ContentService.MimeType.JSON);
}