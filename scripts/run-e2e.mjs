import { spawnSync } from 'child_process';

const npmCli = process.env.npm_execpath;
if (!npmCli) {
  console.error('Run browser tests with "npm run e2e".');
  process.exit(1);
}

function run(args) {
  return spawnSync(process.execPath, [npmCli, ...args], {
    stdio: 'inherit',
  });
}

const beforeReset = run(['run', 'db:reset']);
if (beforeReset.status !== 0) {
  process.exit(beforeReset.status ?? 1);
}

const testResult = run(['exec', 'playwright', 'test']);

const afterReset = run(['run', 'db:reset']);
if (afterReset.status !== 0) {
  process.exit(afterReset.status ?? 1);
}

process.exit(testResult.status ?? 1);

