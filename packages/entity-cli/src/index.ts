import { program } from 'commander';
import { entityGenerator } from './entity-gen';
import { entityAddField } from './entity-add-field';

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

program
  .command('add')
  .description('Add fields to an entity')
  .option('-p, --path <path>', 'Path to the entity directory')
  .option('-j, --json <json>', 'Path to import props from a json file')
  .action(async (options) => {
    const { path, json } = options;
    await entityAddField(path, json);
  });

program.parse();
