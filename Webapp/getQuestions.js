/**
 * Retrieves the questions from the specified sheet.
 * @returns {Array<Object>} An array of question objects.
 */
function getQuestions() {
  const sheet = getSheetById(Sheets.Questions.id);
  const range = sheet.getDataRange();
  const values = range.getValues();
  const questions = values.map((row) => ({
    questionId: row[0],
    questionText: row[1],
    answerType: row[2],
    nextQuestionId: row[3],
  }));
  return questions;
}
