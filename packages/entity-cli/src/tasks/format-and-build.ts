import { execSync } from 'child_process';

export function formatAndBuild() {
  new Promise((res, reject) => {
    try {
      execSync(`cd ${process.cwd()} && pnpm core:build`);
      res('ok');
    } catch (err) {
      reject(err);
    }
  });
}
