/**
 * @OnlyCurrentDoc
 */

const DEBUG = true;
const SS = SpreadsheetApp.getActiveSpreadsheet();

// Define the maximum compensation limits for each year
const COMPENSATION_LIMITS = {
  2023: 330000,
  2024: 345000,
};

const EMAIL_TEMPLATE_ID = "1H4Pcil_j7wQvp-HVr4zwl1pJDA1BV5FjALS4izU-VJA";

const Sheets = {
  Questions: {
    id: "1284410218",
    sheetName: "Questions",
    headerNamedRange: "Questions_Headers",
  },
  QuestionResponseSheet: {
    id: "485435808",
    sheetName: "Question Response Sequence",
    headerNamedRange: "Response_Sequence_Headers",
  },
  GenericFormResponses: {
    id: "2097317555",
    sheetName: "Generic Form Responses",
    headerNamedRange: "Generic_Form_Responses_Headers",
  },
  FormOneResponses: {
    id: "1537978074",
    sheetName: "Form 1 Responses",
    headerNamedRange: "Form_1_Responses_Headers",
  },
  FormTwoResponses: {
    id: "1078431465",
    sheetName: "Form 2 Responses",
    headerNamedRange: "Form_2_Responses_Headers",
  },
  FormThreeResponses: {
    id: "979640658",
    sheetName: "Form 3 Responses",
    headerNamedRange: "Form_3_Responses_Headers",
  },
  FormFourResponses: {
    id: "863420948",
    sheetName: "Form 4 Responses",
    headerNamedRange: "Form_4_Responses_Headers",
  },
  ContributionForConsideredEarnings_2024: {
    id: "0",
    sheetName: "2024 Contribution Input for Considered Earnings",
  },
  ContributionForConsideredEarnings_2023: {
    id: "1530725968",
    sheetName: "2023 Contribution Input for Considered Earnings",
  },
  OutputSheet: {
    id: "1075964513",
    sheetName: "Retirement Pension Estimate Plan Output",
  },
};
