import { MockDpBucketStorageProvider } from '../mock-dp-bucket-storage.provider';
import { v4 as uuid } from 'uuid';

describe('Clone Template From Another Handler Test', () => {
  let storageProvider: MockDpBucketStorageProvider;
  const FAKE_FILE = uuid();
  const FAKE_URL = uuid();

  beforeEach(() => {
    storageProvider = new MockDpBucketStorageProvider(FAKE_URL);
  });

  it('should mock a file save and return correct', async () => {
    const spySaveFile = jest.spyOn(storageProvider, 'saveFile');
    const result = await storageProvider.saveFile(FAKE_FILE);

    expect(result.file_name).toStrictEqual(FAKE_FILE);
    expect(result.url_path).toStrictEqual(FAKE_URL);
    expect(spySaveFile).toHaveBeenCalledTimes(1);
  });

  it('should mock save file temp and return correct data', async () => {
    const spySaveFileTemp = jest.spyOn(storageProvider, 'saveFileTemp');
    const result = await storageProvider.saveFileTemp(FAKE_FILE);

    expect(result.file_name).toStrictEqual(FAKE_FILE);
    expect(result.url_path).toStrictEqual(FAKE_URL);
    expect(spySaveFileTemp).toHaveBeenCalledTimes(1);
  });

  it('should mock get file and return correct data', async () => {
    const spyGetFile = jest.spyOn(storageProvider, 'getFile');
    const result = await storageProvider.getFile(FAKE_FILE);

    expect(result.file_name).toStrictEqual(FAKE_FILE);
    expect(result.url_path).toStrictEqual(FAKE_URL);
    expect(spyGetFile).toHaveBeenCalledTimes(1);
  });
});
