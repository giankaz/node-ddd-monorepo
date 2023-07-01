import { execSync } from 'child_process';

export function formatAndBuild(pkg?: 'core' | 'nest') {
  new Promise((res, reject) => {
    try {
      if (pkg === 'nest') {
        execSync(`cd ${process.cwd()} && pnpm build`);
      } else {
        execSync(`cd ${process.cwd()} && pnpm core:build`);
      }
      res('ok');
    } catch (err) {
      reject(err);
    }
  });
}
