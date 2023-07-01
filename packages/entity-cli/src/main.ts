import { program } from 'commander';
import { GenerateEntityCommand } from './commands/generate-entity.command';

program
  .command('gen')
  .description('Generates an Entity')
  .option('-n, --name <name>', 'Entity name')
  .option('-c, --core <core>', 'Path to generate Core Entity')
  .option('-j, --json <json>', 'Path to import props from a json file')
  .option('-ne, --nest <nest>', 'Path to generate NestJS module')
  .action(async (options) => {
    const { core, name, json, nest } = options;

    await new GenerateEntityCommand({
      corePath: core,
      entityName: name,
      jsonPath: json,
      nestPath: nest,
    }).execute();
  });

program
  .command('add')
  .description('Add fields to an entity')
  .option('-c, --core <core>', 'Path to Core Entity')
  .option('-j, --json <json>', 'Path to import props from a json file')
  .option('-ne, --nest <nest>', 'Path to NestJS module')
  .action(async (options) => {
    const { core, json, nest } = options;

    await new GenerateEntityCommand({
      corePath: core,
      jsonPath: json,
      nestPath: nest,
    }).executeAddField();
  });

program.parse();
