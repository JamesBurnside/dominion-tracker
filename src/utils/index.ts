import logger from 'logger';

export function doNotThrow<T>(fn: (...args: unknown[]) => T): T | undefined {
  try {
    return fn();
  } catch (e) {
    logger.warn(e);
    return undefined;
  }
}

export * from './actionHelper';
export * from './cardDictionary';
export * from './messageSerializer';
export * from './subjectHelper';
