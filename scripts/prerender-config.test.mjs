import assert from 'node:assert/strict';

import { createBrowserLaunchOptions } from './prerender-config.mjs';

function testDockerSafeDefaults() {
  const options = createBrowserLaunchOptions({
    executablePath: '/usr/bin/chromium',
  });

  assert.equal(options.executablePath, '/usr/bin/chromium');
  assert.equal(options.headless, true);
  assert.equal(options.protocolTimeout, 240_000);
  assert.deepEqual(options.args, [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
  ]);
}

function testCustomProtocolTimeout() {
  const options = createBrowserLaunchOptions({
    executablePath: '/usr/bin/chromium',
    protocolTimeout: 300_000,
  });

  assert.equal(options.protocolTimeout, 300_000);
}

testDockerSafeDefaults();
testCustomProtocolTimeout();
