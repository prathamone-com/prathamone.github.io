/**
 * Simple logger for the library package
 */
export const createLogger = (name: string) => ({
  info: (msg: string, ...args: any[]) => console.log(`[${name}] INFO: ${msg}`, ...args),
  warn: (msg: string, ...args: any[]) => console.warn(`[${name}] WARN: ${msg}`, ...args),
  error: (msg: string, err?: any) => console.error(`[${name}] ERROR: ${msg}`, err),
});
