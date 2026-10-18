/**
 * Tales of Ravenwood — paylaşılan veri tipleri.
 * Hem sunucu hem istemci bu dosyayı import eder; tek doğruluk kaynağıdır.
 */

// ───────────────────────────── Sınıflar ─────────────────────────────

export const CLASS_IDS = [
  'Medyum',
  'Dedektif',
  'Bilgin',
  'Simyacı',
  'İzci',
  'Tamirci',
  'Muhafız',
  'Şifacı',
  'Gizemci',
  'Falcı',
  'Günlükçü',
  'Avcı',
] as const;

export type ClassId = (typeof CLASS_IDS)[number];

/** Story JSON'da "herkes seçebilir" anlamına gelen joker. */
export const ANY_CLASS = 'ANY' as const;
export type RequiredClass = ClassId | typeof ANY_CLASS;

export type ClassArchetype = 'Gören' | 'Bilen' | 'Yapan' | 'Koruyan';

export interface ClassDefinition {
  id: ClassId;
  title: string;
  sigil: string; // UI'da logo yerine kullanılan glif
  /** Tek satırlık atmosferik tanım */
  description: string;
  /** Karakterleri Tanı ekranındaki gruplama */
  archetype: ClassArchetype;
  /** Gruptaki görevi — "Bu sınıf ne işe yarar?" */
  duty: string;
  /** Gizli ipucu kartında genelde ne tür bilgi görür */
  sees: string;
  /** Hangi tür aksiyonlarda zar atar (+bonus ile) */
  rollsFor: string;
  /** Yeni oyuncuya masa başı tavsiyesi */
  tip: string;
  /** Bu sınıf ilgili aksiyonlarda zara eklenen bonus. */
  rollBonus: number;
}

// ───────────────────────────── Hikaye ─────────────────────────────

export type EndingType = 'victory' | 'bittersweet' | 'defeat';
export type GameMode = 'cooperative' | 'betrayal';
export type Allegiance = 'adventurers' | 'darkness';
export type AdventureId = 'mahzen' | 'yankilar' | 'on_ucuncu_nota';
export type AudioCue = 'cave_wind' | 'scary_cave' | 'droplets' | 'music_box';

export interface DarknessClue {
  hint: string;
  favored_action_ids: string[];
}

/** Only delivered to this player's socket. Never stored in public room state. */
export interface PrivateRole {
  allegiance: Allegiance;
  cursesLeft: number;
  curseQueued: boolean;
}

export interface StoryEnding {
  type: EndingType;
  title: string;
}

export interface ActionOutcome {
  text: string;
  hp_change: number;
  /** null => hikayenin sonu */
  next_node_id: string | null;
  /** Opsiyonel: next_node_id null olduğunda hangi sona varıldığı */
  ending?: StoryEnding;
}

export interface GameOverInfo {
  victory: boolean;
  type: EndingType;
  title: string;
  reason: string;
  betrayal?: { winningSide: Allegiance; traitorPlayerId: string };
}

export interface StoryAction {
  action_id: string;
  required_class: RequiredClass;
  button_text: string;
  dice_dc: number;
  success: ActionOutcome;
  fail: ActionOutcome;
}

export interface StoryNode {
  ambience?: AudioCue;
  darkness?: DarknessClue;
  node_id: string;
  title: string;
  public_text: string;
  class_hints: Partial<Record<ClassId, string>>;
  actions: StoryAction[];
}

// ───────────────────────────── State machine ─────────────────────────────

export enum GamePhase {
  LOBBY = 'LOBBY',
  SCENE_TEXT = 'SCENE_TEXT',
  PRIVATE_CHOICES = 'PRIVATE_CHOICES',
  DISCUSSION_TIMER = 'DISCUSSION_TIMER',
  DICE_ROLL = 'DICE_ROLL',
  SCENE_RESULT = 'SCENE_RESULT',
  GAME_OVER = 'GAME_OVER',
}

// ───────────────────────────── Oyuncu & Oda ─────────────────────────────

export interface PublicPlayer {
  id: string; // kalıcı oyuncu id'si (socket id değil — yeniden bağlanmada değişmez)
  name: string;
  classId: ClassId | null;
  hp: number;
  maxHp: number;
  isHost: boolean;
  connected: boolean;
  hasChosen: boolean; // seçimi gizli; sadece "seçti mi" bilgisi açık
  ready: boolean;
}

export interface ScalingInfo {
  playerCount: number;
  tier: 'SMALL' | 'STANDARD' | 'LARGE';
  dcMultiplier: number;
  partyHpMultiplier: number;
  distributeDamage: boolean;
}

/** Herkese yayınlanan oda görünümü. Gizli veri asla burada olmaz. */
export interface PublicRoomState {
  adventureId: AdventureId;
  mode: GameMode;
  code: string;
  phase: GamePhase;
  players: PublicPlayer[];
  takenClasses: ClassId[];
  partyHp: number;
  partyMaxHp: number;
  scaling: ScalingInfo | null;
  scene: PublicScene | null;
  phaseEndsAt: number | null; // epoch ms (sunucu saati), istemci geri sayımı için
  /** Mevcut fazın toplam süresi — sayaç halkasını doldurmak için */
  phaseDurationMs: number | null;
  /** Yayın anındaki sunucu saati; istemci kendi saat farkını bununla hesaplar */
  serverNow: number;
  pendingRoll: PendingRoll | null;
  lastResult: SceneResult | null;
  gameOver: GameOverInfo | null;
  /** Kaçıncı sahnede olunduğu (1'den başlar) */
  sceneNumber: number;
}

export interface PublicActionView {
  action_id: string;
  required_class: RequiredClass;
  button_text: string;
  /** Oyuncu sayısına göre ölçeklenmiş DC */
  dc: number;
}

export interface PublicScene {
  ambience: AudioCue | null;
  node_id: string;
  title: string;
  public_text: string;
  actions: PublicActionView[];
}

export interface PendingRoll {
  action_id: string;
  rollerPlayerId: string;
  dc: number;
}

export interface SceneResult {
  darknessPenalty: number;
  action_id: string;
  rollerPlayerId: string;
  roll: number; // ham d20
  bonus: number;
  total: number;
  dc: number;
  success: boolean;
  critical: 'NAT20' | 'NAT1' | null;
  text: string;
  /** Düğümdeki ham hp_change (grup HP değişimi) */
  hpChange: number;
  /** playerId -> işaretli HP değişimi (hasar negatif, iyileşme pozitif) */
  hpDeltaByPlayer: Record<string, number>;
  next_node_id: string | null;
}

/** Sadece tek bir socket'e gönderilen gizli paket. */
export interface PrivateHintPayload {
  /** Only present for the darkness player; never included in public scene data. */
  darkness?: DarknessClue;
  node_id: string;
  classId: ClassId;
  hint: string | null; // bu sahnede sınıfa ipucu yoksa null
  /** Sadece bu oyuncunun sınıfına ait aksiyonlar — seçilirse zarı bu oyuncu atar. */
  ownActionIds: string[];
}

// ───────────────────────────── Socket event sözleşmesi ─────────────────────────────

export type Ack<T = undefined> = (res: { ok: true; data: T } | { ok: false; error: ErrorCode; message: string }) => void;

export type ErrorCode =
  | 'VALIDATION'
  | 'ROOM_NOT_FOUND'
  | 'ROOM_FULL'
  | 'GAME_IN_PROGRESS'
  | 'CLASS_TAKEN'
  | 'NOT_HOST'
  | 'INVALID_PHASE'
  | 'NOT_ALLOWED'
  | 'NOT_ENOUGH_PLAYERS'
  | 'RATE_LIMITED'
  | 'INTERNAL';

export interface JoinResult {
  room: PublicRoomState;
  playerId: string;
  /** Yeniden bağlanma için istemcide (localStorage) saklanır. */
  sessionToken: string;
}

export interface ClientToServerEvents {
  'room:adventure': (p: { adventureId: AdventureId }, ack: Ack) => void;
  'game:ready': (p: { ready: boolean; phase: GamePhase; sceneNumber: number }, ack: Ack) => void;
  'room:mode': (p: { mode: GameMode }, ack: Ack) => void;
  'darkness:curse': (ack: Ack) => void;
  'room:create': (p: { name: string }, ack: Ack<JoinResult>) => void;
  'room:join': (p: { code: string; name: string }, ack: Ack<JoinResult>) => void;
  'room:rejoin': (p: { code: string; sessionToken: string }, ack: Ack<JoinResult>) => void;
  'room:leave': (ack?: Ack) => void;
  'class:select': (p: { classId: ClassId }, ack: Ack) => void;
  'class:release': (ack: Ack) => void;
  'game:start': (ack: Ack) => void;
  /** Host completed game → lobby reset; active phases use game:ready. */
  'game:advance': (ack: Ack) => void;
  'choice:submit': (p: { actionId: string }, ack: Ack) => void;
  'dice:roll': (ack: Ack<SceneResult>) => void;
}

export interface ServerToClientEvents {
  'player:role': (role: PrivateRole | null) => void;
  'room:state': (state: PublicRoomState) => void;
  'scene:hint': (payload: PrivateHintPayload) => void;
  'dice:rolling': (p: { rollerPlayerId: string; action_id: string }) => void;
  'scene:result': (result: SceneResult) => void;
  'game:over': (p: GameOverInfo) => void;
  'room:error': (p: { error: ErrorCode; message: string }) => void;
}
