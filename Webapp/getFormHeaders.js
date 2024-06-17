/**
 * Retrieves the headers of a sheet based on the provided form response.
 *
 * @param {string} formResponse - The name of the form response to retrieve headers from.
 * @returns {Array<string>} - An array containing the headers of the sheet.
 */
function getFormHeaders(formResponse) {
  // Assuming the formResponse matches the sheet name
  var sheet = SS.getSheetByName(formResponse);

  if (!sheet) {
    // Handle case where the sheet does not exist
    return ["Sheet Not Found"];
  }

  // Fetch the first row (headers)
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Return the headers
  return headers;
}
