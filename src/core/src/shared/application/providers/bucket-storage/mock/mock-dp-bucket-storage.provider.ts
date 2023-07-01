import { unlink } from 'fs';
import { IFileSaved, IStorageProvider } from '../interfaces';

export class MockDpBucketStorageProvider implements IStorageProvider {
  FAKE_URL = 'fakePath.com';
  public tempDirPath: string = __dirname;

  constructor(fakeUrl?: string) {
    if (fakeUrl) this.FAKE_URL = fakeUrl;
  }

  public async getFile(file: string): Promise<IFileSaved> {
    unlink(file, (err) => {
      return err;
    });
    return { file_name: file, url_path: this.FAKE_URL };
  }

  public async removeExpiration(file: string): Promise<IFileSaved> {
    unlink(file, (err) => {
      return err;
    });
    return { file_name: file, url_path: this.FAKE_URL };
  }

  public async saveFileTemp(
    file: string,
    expire_at?: Date,
  ): Promise<IFileSaved> {
    unlink(file, (err) => {
      return err;
    });
    return { file_name: file, url_path: this.FAKE_URL };
  }

  public async saveFile(file: string): Promise<IFileSaved> {
    unlink(file, (err) => {
      return err;
    });
    return { file_name: file, url_path: this.FAKE_URL };
  }

  public async deleteFile(file: string): Promise<void> {
    unlink(file, (err) => {
      return err;
    });
    return;
  }

  public async updateFile(file: string, file_id: string): Promise<IFileSaved> {
    unlink(file, (err) => {
      return err;
    });
    return { file_name: file, url_path: file_id };
  }
}
