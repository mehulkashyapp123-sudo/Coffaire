// Starts the Coffaire website (React Router server) for Hostinger.
// Hostinger sets the PORT automatically; we just run the built server.
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));

process.chdir(path.join(here, 'apps/web'));
process.argv[2] = path.join(here, 'dist/apps/web/server/index.js');
if (!process.env.PORT) process.env.PORT = '3000';

require(path.join(here, 'node_modules/@react-router/serve/bin.cjs'));
