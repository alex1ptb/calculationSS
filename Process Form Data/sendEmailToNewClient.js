/**
 * Sends an email to a new client with a retirement pension estimate.
 * @param {Object} formData - The form data containing client information.
 */
function sendEmailToNewClient(formData) {
  DEBUG && console.log("Sending email to new client");
  const pdfFile = createPdfOfEstimate(); // This is now a DriveApp File
  const emailBody = createEmailTemplate(formData);

  GmailApp.sendEmail(formData["Email"], "Retirement Pension Estimate", "", {
    htmlBody: emailBody,
    attachments: [pdfFile.getBlob()], // Send the PDF as an attachment
  });

  // Now that the email is sent, delete the temporary PDF file
  pdfFile.setTrashed(true);

  DEBUG && console.log("Email sent to new client, temporary PDF trashed.");
}
