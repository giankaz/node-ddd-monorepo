import { program } from 'commander';
import { entityGenerator } from './entity-gen';

program
  .command('gen')
  .description('Generates a Entity')
  .option('-p, --path <path>', 'Path to output directory')
  .option('-n, --name <name>', 'Entity name')
  .option('-j, --json <json>', 'Path to import props from a json file')
  .action(async (options) => {
    const { path, name, json } = options;
    await entityGenerator(name, path, json);
  });

program.parse();
