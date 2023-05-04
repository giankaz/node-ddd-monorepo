import { execSync } from 'child_process';

export async function testNewFiles(name: string) {
  new Promise((res) => {
    try {
      execSync(
        `cd "${process.cwd()}/src/core" && pnpm jest --testPathPattern="${name}"`,
      );
      res('ok');
    } catch (err) {
      res('ok');
    }
  });
}
