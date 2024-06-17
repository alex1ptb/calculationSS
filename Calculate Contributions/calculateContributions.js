// /**
//  * Adjusts contribution calculation to account for wages exceeding compensation limits.
//  * If the wage is greater than the compensation limit, profit sharing is calculated as a percentage of the compensation limit.
//  * If the wage is less or equal to the compensation limit, profit sharing is calculated as a percentage of the contribution value from the sheet.
//  *
//  * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The contribution sheet used for calculations.
//  * @param {number} wage The wage value used for finding the contribution.
//  * @param {number} age The age of the individual for finding the contribution.
//  * @param {number} year The year for which the calculation is to be done.
//  * @return {object|string} An object containing the profit sharing amount, or an error message if no match is found.
//  */
// function calculateContribution(sheet, wage, age, year) {

//   DEBUG && console.log(`Running calculate contribution`);
//   console.log(`sheet name: ${sheet.getName()}`);
//   console.log(`wage: ${wage}`, `type of wage: ${typeof wage}`);
//   console.log(`age: ${age}`, `type of age: ${typeof age}`);
//   console.log(`year: ${year}`, `type of year: ${typeof year}`);

//   const rows = sheet.getDataRange().getValues();
//   const wageRow = rows[1]; // Assumes the second row contains wage brackets
//   const ageColumn = rows.map(row => row[0]); // Assumes the first column contains ages

//   // Normalize wage for comparison
//   wage = Number(wage.toString().replace(/[\$,]/g, ""));

//   if (!(year in COMPENSATION_LIMITS)) {
//     return "Invalid year provided";
//   }

//   const compensationLimit = COMPENSATION_LIMITS[year];
//   const columnForWage = wageRow.findIndex(value => wage >= value);
//   const rowForAge = ageColumn.findIndex(a => a === Number(age));

//   if (columnForWage === -1 || rowForAge === -1) {
//     return "No matching column for wage or no matching row for age found";
//   }

//   const contributionValue = rows[rowForAge][columnForWage];
//   const profitSharingPercent = 0.06;
//   let profitSharingAmount;

//   if (wage > compensationLimit) {
//     // Calculate profit sharing based on the compensation limit if wage exceeds it
//     profitSharingAmount = compensationLimit * profitSharingPercent;
//   } else {
//     // Otherwise, use the contribution value for profit sharing calculation
//     profitSharingAmount = contributionValue * profitSharingPercent;
//   }

//   console.log(`Profit sharing amount: ${profitSharingAmount}`);

//   return  profitSharingAmount
// }

/**
 * Main function to calculate contributions for an array of UIDs.
 * Fetches wages and ages for each UID, and calculates contributions.
 *
 * @param {Array<string>} uids An array of UIDs to process.
 * @return {Array<Array<number|string>>} An array of calculated contributions.
 * @customfunction
 */
function CALCULATE_CONTRIBUTIONS(uids) {
  if (!uids || !uids.length) return [["UIDs are required"]];
  DEBUG && console.log(`uids: ${uids}`);
  uids = uids.flat();
  const mainSheet = SS.getSheetByName(Sheets.OutputSheet.sheetName);
  const wages = getWagesByUID(mainSheet, uids);
  const results = [];

  // Loop through each UID and calculate contribution
  uids.forEach((uidArray, index) => {
    const uid = uidArray;
    if (!uid) {
      return;
    }

    const { year, age } = getYearAndAge(mainSheet, uid);
    DEBUG && console.log(`year: ${year}`, `age: ${age}`);
    if (!year) {
      throw new Error(`Year not found for UID: ${uid}`);
    }
    if (!age) {
      throw new Error(`Age not found for UID: ${uid}`);
    }
    try {
      const sheetName = getSheetName(Number(year));
      const contributionSheet = SS.getSheetByName(sheetName);
      const wage = wages[index];
      const contributionValue = calculateContribution(
        contributionSheet,
        wage,
        age,
        year
      );

      results.push([contributionValue.contribution]);
    } catch (e) {
      results.push([`Error: ${e.message}`, ""]);
    }
  });
  // results.unshift(["Estimated Cash Balance Allocation"]);
  DEBUG && console.log(`end results: ${results}`);
  console.log(results);
  return results;
}

/**
 * Calculates the contribution based on Wages and Age from the specified contribution sheet.
 * It finds the column by comparing wages against values in Row 2,
 * and the row by matching the age in Column A.
 * It calculates the profit sharing as 6% of the contribution value (from the sheet)
 * or 6% of the year's compensation limit, whichever is lower.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The contribution sheet used for calculations.
 * @param {number} wage The wage value used for finding the contribution.
 * @param {number} age The age of the individual for finding the contribution.
 * @param {number} year The year for which the calculation is to be done.
 * @return {object|string} An object containing the contribution and profit sharing values,
 *                         or an error message if no match is found.
 */
function calculateContribution(sheet, wage, age, year) {
  // Optional debug log
  DEBUG && console.log(`Running calculate contribution`);
  DEBUG && console.log(`sheet name: ${sheet.getName()}`);
  DEBUG && console.log(`wage: ${wage}`, `type of wage: ${typeof wage}`);
  DEBUG && console.log(`age: ${age}`, `type of age: ${typeof age}`);
  DEBUG && console.log(`year: ${year}`, `type of year: ${typeof year}`);

  const rows = sheet.getDataRange().getValues();

  const wageRow = rows[1]; // Assumes the second row contains wage brackets
  DEBUG && console.log(`wageRow: ${wageRow}`);
  const ageColumn = rows.map((row) => row[0]); // Assumes the first column contains ages

  // Normalize wage by removing any commas or dollar signs for comparison
  wage = Number(wage.toString().replace(/[\$,]/g, ""));

  // Check if the provided year is valid
  if (!(year in COMPENSATION_LIMITS)) {
    return "Invalid year provided";
  }

  // Find the right column and row based on wage and age
  const columnForWage = wageRow.findIndex((value) => wage > value);
  const rowForAge = ageColumn.findIndex((a) => a === Number(age));

  // Check if valid column and row are found
  if (columnForWage === -1) return "No matching column for wage";
  if (rowForAge === -1) return "No matching row for age";

  // Fetch the contribution value from the sheet
  const contributionValue = rows[rowForAge][columnForWage];
  DEBUG && console.log(`contribution value: ${contributionValue}`);
  // Calculate profit sharing as 6% of the contribution or 6% of the cap (whichever is lower)
  const profitSharingPercent = 0.06;
  const cappedValue = Math.min(contributionValue, COMPENSATION_LIMITS[year]);

  DEBUG && console.log(`cappedValue: ${cappedValue}`);

  return contributionValue;

  const profitSharingAmount = conti * profitSharingPercent;

  return profitSharingAmount;
}
