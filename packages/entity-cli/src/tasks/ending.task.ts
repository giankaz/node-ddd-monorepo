import Listr from 'listr';
import { ITask } from '../interfaces/task';
import { execPromise } from '../utils/exec-promise.util';
import { boldLog } from '../utils/logger';

export class EndingTasks implements ITask {
  public async run(name: string) {
    new Listr(
      [
        {
          title: '1️⃣  Generating Core index.ts export files. 🛠️\n',
          task: async () =>
            await execPromise(`cd ${process.cwd()} && pnpm core:cti`),
        },
        {
          title: '2️⃣  Generating Nestjs index.ts export files. 🛠️\n',
          task: async () =>
            await execPromise(`cd ${process.cwd()} && pnpm nest:cti`),
        },
        {
          title: '3️⃣  Building projects. (Takes longer) 🛠️\n',
          task: async () =>
            await execPromise(`cd ${process.cwd()} && pnpm build:src`),
        },
        {
          title: '4️⃣  Testing Core generated entity. 🛠️\n',
          task: async () =>
            await execPromise(
              `cd "${process.cwd()}" && pnpm core:test:filter --testPathPattern="${name}"`,
            ),
        },
        {
          title: '5️⃣  Testing Nestjs generated routes. 🛠️\n',
          task: async () =>
            await execPromise(
              `cd "${process.cwd()}" && pnpm nest:test:filter --testPathPattern="${name}"`,
            ),
        },
      ],
      {
        exitOnError: false,
      },
    )
      .run()
      .finally(() => {
        boldLog(
          `🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆
🎆                                                               \u2009🎆
🎆       🚀 The entity generator has finished it process. 🚀     \u2009🎆
🎆                                                               \u2009🎆
🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆`,
        );
        process.exit();
      });
  }
}
