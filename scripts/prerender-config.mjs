const DEFAULT_PROTOCOL_TIMEOUT = 240_000;

export function createBrowserLaunchOptions({
  executablePath,
  protocolTimeout = Number(process.env.PUPPETEER_PROTOCOL_TIMEOUT || DEFAULT_PROTOCOL_TIMEOUT),
} = {}) {
  return {
    headless: true,
    executablePath,
    protocolTimeout,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  };
}
