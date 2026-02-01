declare module 'formidable';

export interface Fields {
  file: File;
}

export interface ParsedFiles {
  file: [string];
  fields: Fields;
}