/**
 * Creates an email template using the provided form data.
 *
 * @param {Object} formData - The form data used to populate the email template.
 * @returns {string} The content of the email template as HTML.
 */
function createEmailTemplate(formData) {
  // Get the file using the document ID and make a copy
  var file = DriveApp.getFileById(EMAIL_TEMPLATE_ID);
  var copy = file.makeCopy();
  var copyId = copy.getId();
  var copyDoc = DocumentApp.openById(copyId);
  var copyBody = copyDoc.getBody();

  // Replace placeholders with actual data in the copy
  copyBody.replaceText("{{fName}}", formData["First Name"]);
  copyBody.replaceText("{{lName}}", formData["Last Name"]);

  // Save and close the copied document
  copyDoc.saveAndClose();

  // Wait for changes to propagate
  Utilities.sleep(2000);

  // Retrieve the content of the copied document as HTML
  var url =
    "https://docs.google.com/feeds/download/documents/export/Export?id=" +
    copyId +
    "&exportFormat=html";
  var options = {
    headers: {
      Authorization: "Bearer " + ScriptApp.getOAuthToken(),
    },
  };
  var response = UrlFetchApp.fetch(url, options);
  var htmlContent = response.getContentText();

  // Optionally, delete the copy after retrieving its content
  DriveApp.getFileById(copyId).setTrashed(true);

  return htmlContent;
}
