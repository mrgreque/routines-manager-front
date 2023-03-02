export interface ILog {
  _id?: string;
  project: string;
  error: boolean;
  log: string;
  createdAt: Date;
}
