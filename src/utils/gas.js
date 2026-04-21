/**
 * Wraps google.script.run in a Promise.
 * Falls back to a mock in local dev (window.google is undefined).
 *
 * Usage: const result = await serverCall('myFunction', arg1, arg2)
 */
export function serverCall(fnName, ...args) {
  if (typeof google === 'undefined') {
    return devMock(fnName, ...args)
  }

  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [fnName](...args)
  })
}

// Stub responses for local Vite dev server — add entries as needed
const devMocks = {
  getServerData: () => ({ message: '[DEV] Hello from mock server!' }),
  getConfig: () => ({ appName: '[DEV] GAS App' }),
}

function devMock(fnName) {
  const mock = devMocks[fnName]
  if (mock) return Promise.resolve(mock())
  return Promise.reject(new Error(`[DEV] No mock defined for "${fnName}"`))
}
