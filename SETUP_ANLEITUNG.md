# Vicky Anmeldungsseite - Setup Anleitung

## Übersicht
Diese Website ermöglicht die Anmeldung für Sporttraining (Individualtraining und Hausaufgabenhilfe) und speichert die Daten in Google Sheets über Google Apps Script.

## Setup Schritte

### 1. Google Sheets erstellen
1. Gehe zu [Google Sheets](https://sheets.google.com)
2. Erstelle eine neue Tabelle
3. Benenne sie z.B. "Vicky Anmeldungen"
4. Erstelle folgende Spaltenüberschriften in der ersten Zeile:
   - A1: `Zeitstempel`
   - B1: `Kalenderwoche`
   - C1: `Kind Name`
   - D1: `Jahrgang/Team`
   - E1: `Eltern Name`
   - F1: `E-Mail`
   - G1: `Telefon`
   - H1: `Mo Individualtraining`
   - I1: `Do Hausaufgabenhilfe`
   - J1: `Bemerkungen`

### 2. Google Apps Script einrichten
1. Öffne deine Google Sheets Tabelle
2. Gehe zu `Erweiterungen` → `Apps Script`
3. Lösche den vorhandenen Code und füge den Inhalt aus `Code.gs` ein
4. **WICHTIG**: Ändere das Admin-Passwort in Zeile 1:
   ```javascript
   const ADMIN_PASSCODE = 'Vicky1885!'; // Hier dein Passwort eingeben
   ```

### 3. Apps Script bereitstellen
1. Klicke auf `Bereitstellen` → `Neue Bereitstellung`
2. Wähle als Typ: `Web-App`
3. Beschreibung: "Vicky Anmeldungsseite API"
4. Ausführen als: `Ich`
5. Zugriff haben: `Jeder`
6. Klicke auf `Bereitstellen`
7. **Kopiere die Web-App-URL** - diese brauchst du im nächsten Schritt

### 4. Website konfigurieren
1. Öffne `index.html` in einem Texteditor
2. Suche nach `YOUR_GOOGLE_APPS_SCRIPT_URL` (2 Stellen)
3. Ersetze beide Vorkommen mit deiner kopierten Web-App-URL

**Beispiel:**
```javascript
// Vorher:
const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {

// Nachher:
const response = await fetch('https://script.google.com/macros/s/DEINE_SCRIPT_ID/exec', {
```

### 5. Berechtigungen erteilen
1. Beim ersten Test der Website wirst du nach Berechtigungen gefragt
2. Klicke auf `Berechtigungen prüfen`
3. Wähle dein Google-Konto
4. Klicke auf `Erweitert` → `Zu [Projektname] wechseln (unsicher)`
5. Klicke auf `Zulassen`

## Verwendung

### Für Benutzer (Anmeldung)
- Öffne `index.html` im Browser
- Fülle das Anmeldeformular aus
- Die Kalenderwoche wird automatisch vorausgefüllt
- Klicke auf "Anmeldung absenden"

### Für Admins (Anmeldungen verwalten)
- Scrolle zum Admin-Bereich
- Gib das Admin-Passwort ein
- Klicke auf "Anmeldungen laden"
- Verwende den Filter um nach Kalenderwochen zu suchen
- Exportiere Daten als CSV-Datei

## Sicherheitshinweise
- Ändere das Admin-Passwort in `Code.gs`
- Teile die Web-App-URL nur mit vertrauenswürdigen Personen
- Die Google Sheets Tabelle sollte nur für dich zugänglich sein

## Troubleshooting

### Fehler: "Verbindungsfehler"
- Überprüfe die Web-App-URL in `index.html`
- Stelle sicher, dass das Apps Script bereitgestellt ist

### Fehler: "Unauthorized"
- Überprüfe das Admin-Passwort
- Stelle sicher, dass es in `Code.gs` korrekt gesetzt ist

### Anmeldungen werden nicht gespeichert
- Überprüfe die Spaltenüberschriften in Google Sheets
- Stelle sicher, dass die Berechtigungen erteilt wurden

## Anpassungen
Du kannst die Website nach deinen Wünschen anpassen:
- Farben in den CSS-Variablen ändern
- Formularfelder hinzufügen/entfernen
- Text und Beschriftungen anpassen

Bei Fragen oder Problemen, überprüfe die Browser-Konsole (F12) für Fehlermeldungen.
