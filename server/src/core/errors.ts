import type { ErrorCode } from '../../../shared/types';

/** İş kuralı ihlalleri için tipli hata. Socket katmanında ack'e dönüştürülür. */
export class GameError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'GameError';
  }
}
