/**
 * Processes form data and appends it to a Google Sheets document.
 * If the target sheet does not exist, it creates a new one.
 * It also generates a timestamp and a unique identifier (UID) for each form submission.
 *
 * @param {Object} formData - The form data to be processed. It should contain the following properties:
 * - targetSheet: The name of the target sheet where the data will be appended.
 * - First Name: The first name of the submitter.
 * - Last Name: The last name of the submitter.
 * - Phone Number: The phone number of the submitter.
 * - Age: The age of the submitter.
 * - Email: The email address of the submitter.
 * - Company Name: The name of the submitter's company.
 * - Dollar Amount of Net Business Profit (Numeric): The dollar amount of the submitter's net business profit.
 * - What was your previous year Net Business Profit reported on Line 31 on Form Schedule C? (Numeric): The previous year's net business profit reported on Line 31 on Form Schedule C.
 * - Tax Year for Estimate (2023/2024): The tax year for the estimate.
 *
 * @returns {string} A message indicating whether the data was submitted successfully or an error occurred.
 * @throws {Error} If an error occurs during the processing of the form data.
 */
function processFormData(formData) {
  DEBUG && console.log(`formData: ${JSON.stringify(formData)}`);
  try {
    const sheetName = formData.targetSheet || "Generic Form Reponse";
    DEBUG && console.log(`sheetName: ${sheetName}`);
    const sheet = SS.getSheetByName(sheetName);

    // Generate a timestamp and a UID
    const timestamp = new Date();
    const uid = Utilities.getUuid();

    // If the sheet does not exist, create it
    if (!sheet) {
      console.log(`Sheet does not exist: ${sheetName}`);
      // Create the sheet if it does not exist
      sheet = SS.insertSheet(sheetName);
      // Set the headers using formData keys
      const headers = ["Timestamp", "UID"].concat(Object.keys(formData));
      sheet.appendRow(headers);
    }

    // Retrieve headers from the sheet
    const sheetHeaders = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

    DEBUG && console.log(`sheetHeaders: ${sheetHeaders}`);

    // Create an empty array for the row data
    let rowData = new Array(sheetHeaders.length).fill("");

    // Set Timestamp and UID
    const timestampIndex = sheetHeaders.indexOf("Timestamp");
    const uidIndex = sheetHeaders.indexOf("UID");

    // Set the timestamp and UID in the row data if the corresponding headers exist
    if (timestampIndex >= 0) rowData[timestampIndex] = timestamp;
    if (uidIndex >= 0) rowData[uidIndex] = uid;

    // Map formData to the correct columns based on headers
    Object.keys(formData).forEach((key) => {
      let columnIndex = sheetHeaders.indexOf(key);
      if (columnIndex >= 0) {
        rowData[columnIndex] = formData[key];
      }
    });

    setDataToEstimatePlan(formData, timestamp, uid);

    // Append the row data
    sheet.appendRow(rowData);

    DEBUG &&
      console.log(`Data appended to sheet: ${sheetName}, rowData: ${rowData}`);

    //update the PDF form with the new data
    updatePDFForm(formData);

    // wait for the pdf to be updated
    Utilities.sleep(5000);

    //make sure the data is flushed
    SpreadsheetApp.flush();

    // Send an email to the new client with the retirement pension estimate
    sendEmailToNewClient(formData);

    return "Data submitted successfully";
  } catch (e) {
    // Log and return the error message
    console.error("Error processing form data: " + e.toString());
    return "Error: " + e.toString();
  }
}
