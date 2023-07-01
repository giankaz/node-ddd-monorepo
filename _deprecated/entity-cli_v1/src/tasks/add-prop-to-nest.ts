import { Props } from '../models/props';
import { parseDto } from '../parsers/parsedto';
import { insertAfterOccurrences } from '../utils/insertAfterOccurrences';

export async function addPropToNest(name: string, props: Props, path: string) {
  const propsdto = parseDto(props);

  insertAfterOccurrences(`${path}`, [
    {
      searchText: '/*propsdto*/',
      textToInsert: propsdto,
    },
  ]);

  console.log(
    '\x1b[1m%s\x1b[0m',
    `✅  The props for the NestJS Module ${name} were successfully added.\n\n🛠️   Now the files are being formatted by prettier and builded.\n\n`,
  );
}
