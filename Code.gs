const ADMIN_PASSCODE = 'Vicky1885!'; // <— ggf. anpassen

/** Tolerante Bool-Konvertierung */
function asBool(v) {
  if (v === true || v === false) return v;
  if (v == null) return false;
  const s = String(v).trim().toLowerCase();
  return s === 'true' || s === '1' || s === 'yes' || s === 'ja';
}

/** Sheet sicher holen (erste Tabelle oder per Name) */
function getTargetSheet_() {
  // Wenn du einen Namen hast, z. B. return SpreadsheetApp.getActive().getSheetByName('Antworten');
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const sheet = getTargetSheet_();

    // Aliase abfangen (robust gegen leicht andere Feldnamen)
    const kalenderwoche = data.kalenderwoche || data.kw || '';
    const kindName = data.kind_name || data.kind || data.name || '';

    const mo_individualtraining =
      asBool(data.mo_individualtraining ?? data.mo_individualtra ?? data.mo_individual);

    const do_hausaufgabenhilfe =
      asBool(data.do_hausaufgabenhilfe ?? data.do_hausaufgabe ?? data.hausaufgabe);

    const torwarttraining =
      asBool(data.torwarttraining ?? data.torwarttra ?? data.torwart);

    // Eine Zeile atomar schreiben (verhindert Spalten-Versatz)
    const rowValues = [
      new Date(),            // A: timestamp
      kalenderwoche,         // B: kalenderwoche
      kindName,              // C: kind_name
      mo_individualtraining, // D: mo_individualtraining
      do_hausaufgabenhilfe,  // E: do_hausaufgabenhilfe
      torwarttraining        // F: torwarttraining
    ];

    // appendRow ist hier am sichersten – keine Kollisionen mit getLastRow()
    sheet.appendRow(rowValues);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
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
      const sheet = getTargetSheet_();
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
