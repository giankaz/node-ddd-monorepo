import { IImportation } from './importation.dto';

export type ImportationInput = Omit<IImportation, 'id'>;
