// Frontend-only mode - Just run Vite dev server
import { spawn } from 'child_process';
import path from 'path';

// Prefer launching the local vite binary directly via node to avoid relying on `npx`
// which may not be available in some environments (Windows CI, restricted PATH).
const viteBinary = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
const vite = spawn(process.execPath, [viteBinary, '--port', '5000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

vite.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

vite.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  vite.kill('SIGINT');
  process.exit(0);
});
