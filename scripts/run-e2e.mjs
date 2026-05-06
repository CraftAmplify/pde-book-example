import { spawnSync } from 'child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(command, args) {
  return spawnSync(command, args, {
    stdio: 'inherit',
  });
}

const beforeReset = run(npmCommand, ['run', 'db:reset']);
if (beforeReset.status !== 0) {
  process.exit(beforeReset.status ?? 1);
}

const testResult = run(npmCommand, ['exec', 'playwright', 'test']);

const afterReset = run(npmCommand, ['run', 'db:reset']);
if (afterReset.status !== 0) {
  process.exit(afterReset.status ?? 1);
}

process.exit(testResult.status ?? 1);

