import execSh from 'exec-sh';

export async function execPromise(cmd: string) {
  return await execSh.promise(cmd, {
    stdio: 'ignore',
  });
}
