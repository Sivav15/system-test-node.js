declare module 'dotenv' {
    export function config(options?: { path?: string; encoding?: string; debug?: boolean }): { error?: Error; parsed?: { [key: string]: string } };
  }
  