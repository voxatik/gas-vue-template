// Script properties are set in GAS Project Settings > Script Properties
function getConfig() {
  const props = PropertiesService.getScriptProperties()
  return {
    appName: props.getProperty('APP_NAME') || 'GAS App',
  }
}
