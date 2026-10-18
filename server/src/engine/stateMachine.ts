import { GamePhase } from '../../../shared/types';
import { GameError } from '../core/errors';

/**
 * İzin verilen faz geçişleri. Bu tablo dışındaki her geçiş bir programlama
 * hatasıdır ve exception fırlatır. Aktif aşamalar oyuncuların hazır onayıyla ilerler.
 *
 *  LOBBY → SCENE_TEXT → PRIVATE_CHOICES → DISCUSSION_TIMER → DICE_ROLL → SCENE_RESULT
 *                ↑                                                            │
 *                └──────────────────── sonraki düğüm ─────────────────────────┘
 *                                                               │
 *                                                               └→ GAME_OVER → LOBBY
 */
const TRANSITIONS: Readonly<Record<GamePhase, readonly GamePhase[]>> = {
  [GamePhase.LOBBY]: [GamePhase.SCENE_TEXT],
  [GamePhase.SCENE_TEXT]: [GamePhase.PRIVATE_CHOICES, GamePhase.GAME_OVER],
  [GamePhase.PRIVATE_CHOICES]: [GamePhase.DISCUSSION_TIMER, GamePhase.GAME_OVER],
  [GamePhase.DISCUSSION_TIMER]: [GamePhase.DICE_ROLL, GamePhase.GAME_OVER],
  [GamePhase.DICE_ROLL]: [GamePhase.SCENE_RESULT, GamePhase.GAME_OVER],
  [GamePhase.SCENE_RESULT]: [GamePhase.SCENE_TEXT, GamePhase.GAME_OVER],
  [GamePhase.GAME_OVER]: [GamePhase.LOBBY],
};

export function canTransition(from: GamePhase, to: GamePhase): boolean {
  return TRANSITIONS[from].includes(to);
}

export function assertTransition(from: GamePhase, to: GamePhase): void {
  if (!canTransition(from, to)) {
    throw new Error(`Geçersiz faz geçişi: ${from} → ${to}`);
  }
}

export function assertPhase(current: GamePhase, ...expected: GamePhase[]): void {
  if (!expected.includes(current)) {
    throw new GameError('INVALID_PHASE', `Bu işlem ${expected.join('/')} fazında yapılabilir (şu an: ${current})`);
  }
}
