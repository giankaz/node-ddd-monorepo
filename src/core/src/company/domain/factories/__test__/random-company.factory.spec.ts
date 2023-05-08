import { v4 as uuid } from 'uuid';
import { RandomCompanyFactory } from '../random-company.factory';
import { IPartialCompany } from '../../../application';

describe('Random Company Factory Test', (): void => {
  it('should create and convert to JSON', async () => {
    const entity = RandomCompanyFactory.createOne();
    for (const key in entity.props) {
      expect(entity.toJSON()).toHaveProperty(key);
    }
  });

  it('should get the id', async () => {
    const entity = RandomCompanyFactory.createOne();
    expect(entity.id).toBeDefined();
  });

  it('should create with custom props', async () => {
    const customProps: IPartialCompany = {
      name: 'CUSTOM',
    };
    const entity = RandomCompanyFactory.createOne(customProps);
    expect(entity.props.name).toStrictEqual(customProps.name);
  });

  it('should create multiples', async () => {
    const entities = RandomCompanyFactory.createMultiple();

    entities.forEach((entity) => {
      expect(entity.id).toBeDefined();
    });
  });

  it('should create multiples with custom length', async () => {
    const entities = RandomCompanyFactory.createMultiple(10);

    entities.forEach((entity) => {
      expect(entity.id).toBeDefined();
    });

    expect(entities.length).toBe(10);
  });

  it('should create multiples with custom props', async () => {
    const FAKE_ID = uuid();
    const entities = RandomCompanyFactory.createMultiple(10, {
      name: FAKE_ID,
    });

    entities.forEach((entity) => {
      expect(entity.id).toBeDefined();
      expect(entity.name).toStrictEqual(FAKE_ID);
    });

    expect(entities.length).toBe(10);
  });
});
