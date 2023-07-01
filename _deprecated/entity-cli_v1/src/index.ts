import { program } from 'commander';
import { entityGenerator } from './entity-gen';
import { entityAddField } from './entity-add-field';

program
  .command('gen')
  .description('Generates a Entity')
  .option('-p, --path <path>', 'Path to output directory')
  .option('-n, --name <name>', 'Entity name')
  .option('-j, --json <json>', 'Path to import props from a json file')
  .option('--nest <nest>', 'Path to generated NestJS module')
  .action(async (options) => {
    const { path, name, json, nest } = options;
    await entityGenerator(name, path, json, nest);
  });

program
  .command('add')
  .description('Add fields to an entity')
  .option('-p, --path <path>', 'Path to the entity directory')
  .option('-j, --json <json>', 'Path to import props from a json file')
  .option('--nest <nest>', 'Path to generated NestJS module')
  .action(async (options) => {
    const { path, json, nest } = options;
    await entityAddField(path, json, nest);
  });

program.parse();
