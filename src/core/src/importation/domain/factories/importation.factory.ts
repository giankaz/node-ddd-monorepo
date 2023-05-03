import { Importation } from '../entities';
import { ImportationInput } from '../../application';

export class CreateImportationFactory {
  public static create(input: ImportationInput): Importation {
    return new Importation(input);
  }
}
