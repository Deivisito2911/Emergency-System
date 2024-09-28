import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run emergency-control-verde:serve',
        production: 'nx run emergency-control-verde:preview',
      },
      ciWebServerCommand: 'nx run emergency-control-verde:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
