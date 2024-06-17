/**
 * Creates a PDF file of the "Sample PDF" sheet in the active spreadsheet.
 * @returns {File} The created PDF file.
 */
function createPdfOfEstimate() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sample PDF");
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const sheetId = sheet.getSheetId();
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?exportFormat=pdf&gid=${sheetId}`;
  const options = {
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true, // Optional: To prevent throwing exceptions for non-2xx HTTP responses
  };
  const response = UrlFetchApp.fetch(url, options);
  const blob = response.getBlob().setName(sheet.getName() + ".pdf");
  // Create a temporary file in Drive
  const pdfFile = DriveApp.createFile(blob);
  return pdfFile; // Return the file instead of the blob
}
