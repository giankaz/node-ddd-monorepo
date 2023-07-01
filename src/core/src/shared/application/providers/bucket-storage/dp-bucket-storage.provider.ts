import axios, { AxiosInstance } from 'axios';
import { addDays } from 'date-fns';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'path';
import {
  IBucketFileSaveResponse,
  IFileSaved,
  IStorageProvider,
} from './interfaces';
import { CoreError } from '../../../domain';
import { Translations } from '../../../../../../../packages/translation_v1/dist';

export class DpBucketStorageProvider implements IStorageProvider {
  public tempDirPath = resolve(process.env.STORAGE_PATH || resolve(__dirname));

  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.DP_BUCKET_URL,
      headers: {
        api_key: process.env.DP_BUCKET_KEY,
      },
    });

    if (!fs.existsSync(this.tempDirPath)) {
      fs.mkdirSync(this.tempDirPath, {
        recursive: true,
      });
    }
  }

  public async getFile(file: string): Promise<IFileSaved> {
    const { data } = await this.api.get<IBucketFileSaveResponse>(
      `/files/${file}`,
    );

    return { file_name: data.file_id, url_path: data.url_path };
  }

  public async removeExpiration(file: string): Promise<IFileSaved> {
    const { data } = await this.api.patch<IBucketFileSaveResponse>(
      `/files/${file}`,
      {
        expire_at: null,
      },
    );

    return { file_name: data.file_id, url_path: data.url_path };
  }

  public async saveFileTemp(
    file: string,
    expire_at?: Date,
  ): Promise<IFileSaved> {
    const filePath = path.resolve(this.tempDirPath, file);
    const expire_date = expire_at || addDays(new Date(), 1);

    if (!fs.existsSync(filePath)) {
      throw new CoreError({
        message: Translations.file_not_found,
        statusCode: 404,
      });
    }

    const fileRead = await fs.promises.readFile(filePath);
    const form = new FormData();

    form.append('file', fileRead, file);
    form.append('expire_at', expire_date.toISOString());

    const { data } = await this.api.post<IBucketFileSaveResponse>(
      '/files',
      form,
    );

    await fs.promises.unlink(filePath);

    return { file_name: data.file_id, url_path: data.url_path };
  }

  public async saveFile(file: string, filename?: string): Promise<IFileSaved> {
    const filePath = path.resolve(this.tempDirPath, file);
    if (!fs.existsSync(filePath)) {
      throw new CoreError({
        message: Translations.file_not_found,
        statusCode: 404,
      });
    }

    const fileRead = await fs.promises.readFile(filePath);
    const form = new FormData();

    form.append('file', fileRead, file);

    if (filename) {
      form.append('filename', filename);
    }

    const { data } = await this.api.post<IBucketFileSaveResponse>(
      '/files',
      form,
    );

    await fs.promises.unlink(filePath);
    return { file_name: data.file_id, url_path: data.url_path };
  }

  public async deleteFile(file: string): Promise<void> {
    await this.api.delete(`/files/${file}`);
  }

  public async updateFile(file: string, file_id: string): Promise<IFileSaved> {
    const filePath = path.resolve(this.tempDirPath, file);
    if (!fs.existsSync(filePath)) {
      throw new CoreError({
        message: Translations.file_not_found,
        statusCode: 404,
      });
    }

    const fileRead = await fs.promises.readFile(filePath);
    const form = new FormData();

    form.append('file', fileRead, file);

    const { data } = await this.api.patch<IBucketFileSaveResponse>(
      `/files/${file_id}`,
      form,
    );

    await fs.promises.unlink(filePath);
    return { file_name: data.file_id, url_path: data.url_path };
  }
}
