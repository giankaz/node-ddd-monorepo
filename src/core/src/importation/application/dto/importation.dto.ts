import { ImportationModel } from '../../domain';

export type IImportation = Pick<ImportationModel, keyof ImportationModel>;
