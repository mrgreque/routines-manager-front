export interface IPath {
  pathFolder?: string;
  resultFolder?: string;
  start?: string;
  stop?: string;
}

export interface IProject {
  _id?: string;
  name: string;
  description: string;
  active: boolean;
  withError: boolean;
  paths?: IPath;
}
