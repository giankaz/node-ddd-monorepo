import * as fs from 'fs';
import { Props } from '../interfaces/props';
import { GenerateCoreFilesHandler } from '../handlers/core.handler';
import { GenerateNestFilesHandler } from '../handlers/nest.handler';
import { keyValidator } from '../utils/key-validator.util';
import { join } from 'path';
import { ICommand } from '../interfaces/command';
import { EntityPrompts } from '../prompts/entity.prompts';
import { PropsPrompts } from '../prompts/props.prompts';
import { EndingTasks } from '../tasks/ending.task';
import { loopNestedObject } from '../utils/loop-nested-object.util';
import { boldLog } from '../utils/logger';
export interface IGenerateData {
  entityName?: string;
  corePath?: string;
  jsonPath?: string;
  nestPath?: string;
}

export class GenerateEntityCommand implements ICommand {
  constructor(private readonly flagData: IGenerateData) {}

  props: Props = {};

  scriptPath = __filename;

  currentDir = this.scriptPath.split('/').slice(0, -1).join('/');

  coreAssetsDir = join(this.currentDir, '..', '/assets/core/xxxxeclixxxx');

  nestAssetsDir = join(this.currentDir, '..', '/assets/nest/xxxxeclixxxx');

  name = this.flagData.entityName;

  nestPath = this.flagData.nestPath;

  corePath = this.flagData.corePath;

  jsonPath = this.flagData.jsonPath;

  coreOutputDir = '';

  nestOutputDir = '';

  public async execute(): Promise<unknown> {
    if (!this.name) {
      this.name = await EntityPrompts.getName();
    }

    if (!this.corePath) {
      this.corePath = await EntityPrompts.getPath('core');
    }

    if (!this.nestPath) {
      this.nestPath = await EntityPrompts.getPath('nest');
    }

    if (!keyValidator(this.name)) {
      return await this.execute();
    }

    this.coreOutputDir = join(process.cwd(), this.corePath, this.name);

    this.nestOutputDir = join(process.cwd(), this.nestPath, this.name);

    let shouldExit = false;

    if (fs.existsSync(this.coreOutputDir)) {
      const yesOrNo = await EntityPrompts.deletePreviousFolderQuestion('core');

      if (yesOrNo === 'yes') {
        fs.rmSync(this.coreOutputDir, { recursive: true, force: true });
        boldLog('Excluding existing folder...');
      } else {
        ('Entity generation stopped.');
        shouldExit = true;
      }
    }

    if (!!this.nestPath && fs.existsSync(this.nestOutputDir)) {
      const yesOrNo = await EntityPrompts.deletePreviousFolderQuestion('nest');

      if (yesOrNo === 'yes') {
        fs.rmSync(this.nestOutputDir, { recursive: true, force: true });
        boldLog('Excluding existing folder...');
      } else {
        boldLog('Module generation stopped.');
        shouldExit = true;
      }
    }

    if (shouldExit) {
      process.exit();
    }

    if (this.jsonPath) {
      await this.fromJson();
    } else {
      await this.propsFeeder();
    }

    await new EndingTasks().run(this.name);
  }

  public async executeAddField() {
    if (!this.corePath) {
      this.corePath = await EntityPrompts.getPath('core', true);
    }

    if (!fs.existsSync(this.corePath)) {
      boldLog('❗ Entity not found on given path ❗\n');
      process.exit();
    }

    if (!this.nestPath) {
      this.nestPath = await EntityPrompts.getPath('nest', true);
    }

    if (!fs.existsSync(String(this.nestPath))) {
      boldLog('❗ NestJS Module not found on given path ❗\n');
      process.exit();
    }

    this.coreOutputDir = join(process.cwd(), this.corePath);

    this.nestOutputDir = join(process.cwd(), this.nestPath);

    const dirArr = this.corePath.split('/');

    const name = dirArr[dirArr.length - 1];

    this.name = name;

    const IS_ADD_PROP = true;

    if (this.jsonPath) {
      await this.fromJson(IS_ADD_PROP);
    } else {
      await this.propsFeeder(IS_ADD_PROP);
    }

    await new EndingTasks().run(this.name);
  }

  private async propsFeeder(isAddProp?: boolean): Promise<unknown> {
    const prop = await PropsPrompts.getName();

    if (prop === 's') {
      const coreHandler = new GenerateCoreFilesHandler({
        coreAssetsDir: this.coreAssetsDir,
        coreOutputDir: this.coreOutputDir,
        name: String(this.name),
        props: this.props,
      });

      await coreHandler.handle(isAddProp);

      const nestHandler = new GenerateNestFilesHandler({
        name: String(this.name),
        nestAssetsDir: this.nestAssetsDir,
        nestOutputDir: this.nestOutputDir,
        props: this.props,
      });

      await nestHandler.handle(isAddProp);

      return;
    }

    if (prop === 'q') {
      process.exit();
    }

    if (!keyValidator(prop, this.props)) {
      return await this.propsFeeder(isAddProp);
    }

    const type = await PropsPrompts.getType(prop);

    if (type === 'object') {
      const result: Props = {};
      await this.subPropFeeder(prop, result, isAddProp);
    } else {
      this.props[prop] = type;
      await this.propsFeeder(isAddProp);
    }
  }

  private async subPropFeeder(
    prop: string,
    result: Props,
    isAddProp?: boolean,
  ): Promise<unknown> {
    const subProp = await PropsPrompts.getSubPropFieldName(prop);

    if (subProp === 'r') {
      result = {};
      return await this.subPropFeeder(prop, result);
    }

    if (subProp === 'b') {
      return await this.propsFeeder(isAddProp);
    }

    if (subProp === 's') {
      this.props[prop] = result;
      return await this.propsFeeder(isAddProp);
    }

    if (subProp === 'q') {
      process.exit();
    }

    if (!keyValidator(subProp, result)) {
      return await this.subPropFeeder(prop, result, isAddProp);
    }

    const type = await PropsPrompts.getType(subProp);

    result[subProp] = type;

    await this.subPropFeeder(subProp, result, isAddProp);
  }

  private async fromJson(isAddProp?: boolean) {
    const data = fs.readFileSync(String(this.jsonPath));

    const jsonData = JSON.parse(data.toString());

    loopNestedObject(jsonData, (key: string) => {
      keyValidator(key, undefined, true);
    });

    const coreHandler = new GenerateCoreFilesHandler({
      coreAssetsDir: this.coreAssetsDir,
      coreOutputDir: this.coreOutputDir,
      name: String(this.name),
      props: jsonData,
    });

    await coreHandler.handle(isAddProp);

    const nestHandler = new GenerateNestFilesHandler({
      name: String(this.name),
      nestAssetsDir: this.nestAssetsDir,
      nestOutputDir: this.nestOutputDir,
      props: jsonData,
    });

    await nestHandler.handle(isAddProp);
  }
}
