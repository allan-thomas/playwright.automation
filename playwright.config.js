import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';


const config =({
  testDir: './tests',
  timeout: 20 * 1000,

expect:{
   timeout: 5000,
},

  reporter : 'html',
  use: {
    
    browserName :'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },

  
});

module.exports = config
