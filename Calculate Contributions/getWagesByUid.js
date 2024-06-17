/**
 * Retrieves wages for each UID from the specified sheet.
 * The wages are fetched based on the column header 'Estimated Wages'.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The main sheet where wages are stored.
 * @param {Array<string>} uids An array of UIDs to find wages for.
 * @return {Array<number>} An array of wage values.
 */
function getWagesByUID(sheet, uids) {
  DEBUG && console.log(`Running getWagesByUID for UIDs: ${uids}`);
  DEBUG && console.log(`sheet name: ${sheet.getName()}`);
  const data = sheet.getDataRange().getDisplayValues();
  const headers = data[0];
  const uidIndex = headers.indexOf("UID");
  const wageIndex = headers.indexOf("Estimated Wages");

  const wages = [];

  uids.forEach((uidArray) => {
    const uid = uidArray;
    if (uid == null || uid == "") return;

    const row = data.find((row) => row[uidIndex] == uid);
    const wage = row ? row[wageIndex] : 0;
    wages.push(wage);
  });
  DEBUG && console.log(`wages: ${wages}`);
  return wages;
}
