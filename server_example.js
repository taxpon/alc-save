// Sample code for Google Apps Script

var URL = "Your Spread Sheet Address";

function addNewLine(word, meaning) {
    var spreadsheet = SpreadsheetApp.openByUrl(URL);
    var sheet = spreadsheet.getSheets()[0];

    var lastRow = sheet.getLastRow();
    var now = new Date();

    sheet.getRange(lastRow + 1, 1).setValue(now);
    sheet.getRange(lastRow + 1, 2).setValue(word);
    sheet.getRange(lastRow + 1, 3).setValue(meaning);
}

function doPost(request) {
    try {
        addNewLine(request.parameters.word, request.parameters.meaning);
        var result = {
            code: 0,
            message: "success"
        }
    } catch (e) {
        var result = {
            code: 1,
            message: "error"
        }
    }

    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}
