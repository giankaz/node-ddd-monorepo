import { Readable } from 'stream';

export interface IFile {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
