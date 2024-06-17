/**
 * Gets the structured questionnaire from the spreadsheet.
 * @return {Object[]} Array of question objects.
 */
function getStructuredQuestions() {
  const sheet = SS.getSheetByName(Sheets.Questions.sheetName);
  const range = sheet.getDataRange();
  const values = range.getValues();
  const questions = [];

  // Skip header row
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    questions.push({
      id: row[0], // Question ID
      text: row[1], // Question Text
      type: row[2], // Answer Type
      next: row[3].split(", "), // Next Question IDs
      notes: row[4], // Notes
    });
  }

  return questions;
}
