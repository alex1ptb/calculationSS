// /**
//  * Sets data to the Retirement Pension Estimate Plan Output sheet based on the provided form data.
//  *
//  * @param {Object} formData - The form data containing the information to be set in the sheet.
//  * - targetSheet: The name of the target sheet where the data will be appended.
//  * - First Name: The first name of the submitter.
//  * - Last Name: The last name of the submitter.
//  * - Phone Number: The phone number of the submitter.
//  * - Age: The age of the submitter.
//  * - Email: The email address of the submitter.
//  * - Company Name: The name of the submitter's company.
//  * - Dollar Amount of Net Business Profit (Numeric): The dollar amount of the submitter's net business profit.
//  * - What was your previous year Net Business Profit reported on Line 31 on Form Schedule C? (Numeric): The previous year's net business profit reported on Line 31 on Form Schedule C.
//  * - Tax Year for Estimate (2023/2024): The tax year for the estimate.
//  *
//  * @param {string} timestamp - The timestamp of when the data is being set.
//  * @param {string} uid - The unique identifier associated with the data.
//  * @returns {void}
//  */
// function setDataToEstimatePlan(formData, timestamp, uid) {
//   DEBUG && console.log(`setDataToEstimatePlan: ${JSON.stringify(formData)}`);
//   //map the following
//   /*
//   Year, First Name, Last Name, Email, Timestamp, UID, Age
//   */
//   // const sheet = SS.getSheetByName("Retirement Pension Estimate Plan Output");
//   const sheet = SS.getSheetByName(Sheets.OutputSheet.sheetName);

//   console.log(`logging sheet: ${sheet}`);

//   const sheetHeaders = sheet
//     .getRange(1, 1, 1, sheet.getLastColumn())
//     .getValues()[0];

//   console.log(`logging sheetHeaders: ${sheetHeaders}`);

//   let rowData = new Array(sheetHeaders.length).fill(""); // Create an empty array for the row data

//   //map over the headers for indexing
//   const headerMappings = {
//     Year: sheetHeaders.indexOf("Year"),
//     "First Name": sheetHeaders.indexOf("First Name"),
//     "Last Name": sheetHeaders.indexOf("Last Name"),
//     Email: sheetHeaders.indexOf("Email"),
//     Timestamp: sheetHeaders.indexOf("Timestamp"),
//     UID: sheetHeaders.indexOf("UID"),
//     Age: sheetHeaders.indexOf("Age"),
//     "Estimated Wages": sheetHeaders.indexOf("Estimated Wages"),
//     "Estimated Cash Balance Allocation": sheetHeaders.indexOf(
//       "Estimated Cash Balance Allocation"
//     ),
//   };

//   let estimatedWages =
//     formData["Dollar Amount of Net Business Profit (Numeric)"] ||
//     formData["W-2 Compensation"] ||
//     formData["Dollar Amount of Guaranteed Payments (Numeric)"] ||
//     formData["Dollar Amount of Officer Compensation (Numeric)"];

//   let targetSheet;
//   if (formData["Tax Year for Estimate (2023/2024)"] == "2023") {
//     targetSheet = SS.getSheetByName(
//       Sheets.ContributionForConsideredEarnings_2023.sheetName
//     );
//   } else {
//     targetSheet = SS.getSheetByName(
//       Sheets.ContributionForConsideredEarnings_2024.sheetName
//     );
//   }

//   let cashBalanceAllocation = calculateContribution(
//     targetSheet,
//     estimatedWages,
//     formData["Age"],
//     formData["Tax Year for Estimate (2023/2024)"]
//   );

//   if (
//     formData.targetSheet == Sheets.FormOneResponses.sheetName ||
//     formData.targetSheet == Sheets.FormThreeResponses.sheetName
//   ) {
//     function circularLogic() {
//       // Earned Income – [Earned Income x 7.65% (50% x Self-employment tax rate of 15.3%)] – Contribution
//       let earnedIncome = estimatedWages;
//       let selfEmploymentTaxRate = 0.0765;
//       let contributionMultiplier = 1.5;
//       let taxAmountSubtotal = earnedIncome * selfEmploymentTaxRate;
//       let profitSharing = 0.06;

//       let contributionAmountToLookFor = earnedIncome - taxAmountSubtotal;

//       cashBalanceAllocation = calculateContribution(
//         targetSheet,
//         contributionAmountToLookFor,
//         formData["Age"],
//         formData["Tax Year for Estimate (2023/2024)"]
//       );

//       let totalWithMultiplier = cashBalanceAllocation * contributionMultiplier;

//       let subTotal = earnedIncome - taxAmountSubtotal - totalWithMultiplier;

//       let subTotalMultipliedByPropfitSharing = subTotal * profitSharing;

//       let totalEarnedIncome = subTotal - subTotalMultipliedByPropfitSharing;

//       return totalEarnedIncome;
//     }
//   }

//   // Use the headerMappings to set the corresponding values in rowData
//   rowData[headerMappings["Year"]] =
//     formData["Tax Year for Estimate (2023/2024)"]; // Assuming the Year is the current year
//   rowData[headerMappings["First Name"]] = formData["First Name"];
//   rowData[headerMappings["Last Name"]] = formData["Last Name"];
//   rowData[headerMappings["Email"]] = formData["Email"];
//   rowData[headerMappings["Timestamp"]] = timestamp; // Assuming timestamp is already in the correct format
//   rowData[headerMappings["UID"]] = uid;
//   rowData[headerMappings["Age"]] = formData["Age"]; // Ensure Age is provided in formData
//   rowData[headerMappings["Estimated Wages"]] = estimatedWages;
//   rowData[headerMappings["Estimated Cash Balance Allocation"]] =
//     cashBalanceAllocation;

//   // Append the rowData to the sheet
//   sheet.appendRow(rowData);
// }
