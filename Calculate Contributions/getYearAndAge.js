/**
 * Retrieves the Year and Age for a given UID from the specified sheet.
 * It dynamically finds the columns based on headers.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The sheet to search for the UID.
 * @param {string} uid The unique identifier to match.
 * @return {Object} An object containing the Year and Age.
 */
function getYearAndAge(sheet, uid) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const uidIndex = headers.indexOf("UID");
  const yearIndex = headers.indexOf("Year");
  const ageIndex = headers.indexOf("Age");

  for (let i = 1; i < data.length; i++) {
    if (data[i][uidIndex] === uid) {
      return { year: data[i][yearIndex], age: data[i][ageIndex] };
    }
  }
  return { year: null, age: null };
}
