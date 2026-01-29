import { spawn } from 'child_process';

function run(cmd, args) {
  const p = spawn(cmd, args, { stdio: 'inherit', shell: true });
  p.on('exit', (code) => {
    if (code !== 0) console.log(`${cmd} ${args.join(' ')} exited with ${code}`);
  });
  return p;
}

console.log('Starting mock AI server...');
const mock = run('node', ['server/mock-ai.js']);

setTimeout(() => {
  console.log('Starting Vite dev server...');
  const vite = run('npm', ['run', 'dev']);
}, 600);

process.on('exit', () => {
  try { mock.kill(); } catch (e) {}
});

process.on('SIGINT', () => process.exit());
process.on('SIGTERM', () => process.exit());
