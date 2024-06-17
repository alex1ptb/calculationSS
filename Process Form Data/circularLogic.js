/**
 * Calculates the total earned income after applying various calculations.
 * Earned Income – [Earned Income x 7.65% (50% x Self-employment tax rate of 15.3%)] – Contribution
 *
 * @param {number} estimatedWages - The estimated wages.
 * @param {string} targetSheet - The target sheet.
 * @param {object} formData - The form data object.
 * @returns {number} The total earned income.
 */
function circularLogic(estimatedWages, targetSheet, formData) {
  let earnedIncome = estimatedWages;
  const selfEmploymentTaxRate = 0.0765;
  const contributionMultiplier = 1.5;
  const profitSharing = 0.06;

  let taxAmountSubtotal = earnedIncome * selfEmploymentTaxRate;

  DEBUG && console.log(`taxAmountSubtotal: ${taxAmountSubtotal}`);

  let contributionAmountToLookFor = earnedIncome - taxAmountSubtotal;

  DEBUG &&
    console.log(`contributionAmountToLookFor: ${contributionAmountToLookFor}`);

  cashBalanceAllocation = calculateContribution(
    targetSheet,
    contributionAmountToLookFor,
    formData["Age"],
    formData["Tax Year for Estimate (2023/2024)"]
  );

  DEBUG && console.log(`cashBalanceAllocation: ${cashBalanceAllocation}`);

  let totalWithMultiplier = cashBalanceAllocation * contributionMultiplier;

  DEBUG && console.log(`totalWithMultiplier: ${totalWithMultiplier}`);

  let subTotal = earnedIncome - taxAmountSubtotal - totalWithMultiplier;

  DEBUG && console.log(`subTotal: ${subTotal}`);

  let subTotalMultipliedByPropfitSharing = subTotal * profitSharing;

  DEBUG &&
    console.log(
      `subTotalMultipliedByPropfitSharing: ${subTotalMultipliedByPropfitSharing}`
    );

  let totalEarnedIncome = subTotal - subTotalMultipliedByPropfitSharing;

  DEBUG && console.log(`totalEarnedIncome: ${totalEarnedIncome}`);

  return totalEarnedIncome;
}
