export interface IBucketFileSaveResponse {
  client_id: string;
  file_id: string;
  url_path: string;
}

export interface IFileSaved {
  url_path: string;
  file_name: string;
}

export interface IStorageProvider {
  tempDirPath: string;
  saveFile(file: string, filename?: string): Promise<IFileSaved>;
  saveFileTemp(file: string, expire_at?: Date): Promise<IFileSaved>;
  getFile(file: string): Promise<IFileSaved>;
  removeExpiration(file: string): Promise<IFileSaved>;
  deleteFile(file: string): Promise<void>;
  updateFile(file: string, file_id: string): Promise<IFileSaved>;
}
