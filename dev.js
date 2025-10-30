#!/usr/bin/env node
import { spawn } from 'child_process';

// Run Vite development server for frontend-only mode
const vite = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0'], {
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
