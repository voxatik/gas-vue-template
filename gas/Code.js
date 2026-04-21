// Web App entry point
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('GAS App')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

// Sidebar entry point (call from a menu item or trigger)
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('index').setTitle('GAS App').setWidth(400)
  SpreadsheetApp.getUi().showSidebar(html)
}

// Dialog entry point
function showDialog() {
  const html = HtmlService.createHtmlOutputFromFile('index').setWidth(800).setHeight(600)
  SpreadsheetApp.getUi().showModalDialog(html, 'GAS App')
}

// Example server function callable from the frontend via serverCall('getServerData')
function getServerData() {
  return { message: 'Hello from Google Apps Script!' }
}
