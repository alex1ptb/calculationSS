function doGet(request) {
  return HtmlService.createTemplateFromFile("Webapp/Index").evaluate();
}

function include(filename) {
  console.log(`Including: ${filename}`);
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
