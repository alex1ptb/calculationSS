/**
 * Updates the named ranges in the "Sample PDF" sheet with the provided form data.
 * @param {Object} formData - The form data object containing the values to be updated in the PDF.
 */
function updatePDFForm(formData) {
  DEBUG &&
    console.log(`formData in updatePDFForm: ${JSON.stringify(formData)}`);
  const retirementSheet = SS.getSheetByName(Sheets.OutputSheet.sheetName);
  const retirementSheetLastRow = retirementSheet.getLastRow();
  const retirementHeaders = retirementSheet
    .getRange(1, 1, 1, retirementSheet.getLastColumn())
    .getValues()[0];

  DEBUG && console.log(`retirement sheet headers: ${retirementHeaders}`);

  const rowData = retirementSheet
    .getRange(retirementSheetLastRow, 1, 1, retirementSheet.getLastColumn())
    .getValues()[0];

  // named ranges
  targetNamedRanges = [
    "PDF_Name", // matched to formData["First Name"] + " " + formData["Last Name"]
    "PDF_EstimatedWages", // matched to formData["Dollar Amount of Net Business Profit (Numeric)"] || formData["W-2 Compensation"] || formData["Dollar Amount of Guaranteed Payments (Numeric)"] || formData["Dollar Amount of Officer Compensation (Numeric)"]
    "PDF_Estimated401KDeferrals", // matched to retimentSheet["Estimated 401k Deferrals"]
    "PDF_EstimatedProfitSharingAllocation", // matched to retirementSheet["Estimated Profit Sharing Allocation"]
    "PDF_CompanyName", // matched to formData["Company Name"]
    "PDF_TotalCashBalanceAllocation", // matched to retirementSheet["Total Cash Balance Allocation"]
    "PDF_EstimatedTotalDeductibleContribution", // matched to retirementSheet["Total Tax Deductible Contribution"]
  ];
  // Map headers to their index for easier access
  const headerIndexMap = retirementHeaders.reduce((acc, header, index) => {
    acc[header] = index;
    return acc;
  }, {});

  // Prepare the data to be set in the "Sample PDF" sheet
  const pdfData = {
    PDF_Name: formData["First Name"] + " " + formData["Last Name"],
    PDF_EstimatedWages:
      formData["Dollar Amount of Net Business Profit (Numeric)"] ||
      formData["W-2 Compensation"] ||
      formData["Dollar Amount of Guaranteed Payments (Numeric)"] ||
      formData["Dollar Amount of Officer Compensation (Numeric)"],
    PDF_Estimated401KDeferrals:
      rowData[headerIndexMap["Estimated 401k Deferrals"]],
    PDF_EstimatedProfitSharingAllocation:
      rowData[headerIndexMap["Estimated Profit Sharing Allocation"]],
    PDF_CompanyName: formData["Company Name"],
    PDF_TotalCashBalanceAllocation:
      rowData[headerIndexMap["Total Cash Balance Allocation"]],
    PDF_EstimatedTotalDeductibleContribution:
      rowData[headerIndexMap["Total Tax Deductible Contribution"]],
  };

  // Update the named ranges in the "Sample PDF" sheet with the prepared data
  Object.entries(pdfData).forEach(([namedRange, value]) => {
    const range =
      SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange);
    range.setValue(value);
  });
}
