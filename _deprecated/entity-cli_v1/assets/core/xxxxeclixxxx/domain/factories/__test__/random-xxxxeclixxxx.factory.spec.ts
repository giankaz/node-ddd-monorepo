import { v4 as uuid } from 'uuid';
import { RandomXxxxeclixxxxFactory } from '../random-xxxxeclixxxx.factory';
import { IPartialXxxxeclixxxx } from '../../../application';

describe('Random Xxxxeclixxxx Factory Test', (): void => {
  it('should create and convert to JSON', async () => {
    const entity = RandomXxxxeclixxxxFactory.createOne();
    for (const key in entity.props) {
      expect(entity.toJSON()).toHaveProperty(key);
    }
  });

  it('should get the id', async () => {
    const entity = RandomXxxxeclixxxxFactory.createOne();
    expect(entity.id).toBeDefined();
  });

  it('should create with custom props', async () => {
    const customProps: IPartialXxxxeclixxxx = {
      name: 'CUSTOM',
    };
    const entity = RandomXxxxeclixxxxFactory.createOne(customProps);
    expect(entity.props.name).toStrictEqual(customProps.name);
  });

  it('should create multiples', async () => {
    const entities = RandomXxxxeclixxxxFactory.createMultiple();

    entities.forEach((entity) => {
      expect(entity.id).toBeDefined();
    });
  });

  it('should create multiples with custom length', async () => {
    const entities = RandomXxxxeclixxxxFactory.createMultiple(10);

    entities.forEach((entity) => {
      expect(entity.id).toBeDefined();
    });

    expect(entities.length).toBe(10);
  });

  it('should create multiples with custom props', async () => {
    const FAKE_ID = uuid();
    const entities = RandomXxxxeclixxxxFactory.createMultiple(10, {
      name: FAKE_ID,
    });

    entities.forEach((entity) => {
      expect(entity.id).toBeDefined();
      expect(entity.name).toStrictEqual(FAKE_ID);
    });

    expect(entities.length).toBe(10);
  });
});
