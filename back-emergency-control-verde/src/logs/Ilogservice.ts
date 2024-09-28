export interface IlogService {
  log(level: string, obj: string): void;

  error(error: Error): void;

  warn(message: string): void;

  info(message: string): void;
}
