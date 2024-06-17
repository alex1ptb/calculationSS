/**
 * Get Sheet By ID
 * @param {number} id The ID of the sheet to retrieve.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The sheet with the given ID.
 */
function getSheetById(id) {
  let sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  id = Number(id); // Ensure id is a number
  for (let sheet of sheets) {
    if (sheet.getSheetId() === id) {
      return sheet;
    }
  }
  return null; // Return null if no sheet is found
}
