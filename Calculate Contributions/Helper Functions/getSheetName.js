/**
 * Returns the sheet name for the specified year.
 *
 * @param {number} year The year to get the sheet name for.
 * @return {string} The name of the sheet.
 */
function getSheetName(year) {
  DEBUG && console.log(`year in getSheetName: ${year}`);
  DEBUG && console.log(`type of: ${typeof year}`);
  year = Number(year);
  return year == 2024
    ? "2024 Contribution Input for Considered Earnings"
    : "2023 Contribution Input for Considered Earnings";
}
