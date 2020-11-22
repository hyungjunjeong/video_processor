export interface Ifile {
  name: string;
  path: string;
  size: number;
  lastModified?: number;
  lastModifiedDate?: string;
  type?: string;
  webkitRelativePath?: string;
}
