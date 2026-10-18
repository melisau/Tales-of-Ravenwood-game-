import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  ClassId,
  AdventureId,
  GameMode,
  GameOverInfo,
  JoinResult,
  PrivateHintPayload,
  PrivateRole,
  PublicPlayer,
  PublicRoomState,
  SceneResult,
} from '../../../shared/types';
import { GamePhase } from '../../../shared/types';
import { call, createSocket, type GameSocket } from '../net/socket';

const SESSION_KEY = 'ravenwood.session';
const NAME_KEY = 'ravenwood.name';

interface Session {
  code: string;
  sessionToken: string;
  playerId: string;
}

const storage = {
  get<T>(key: string): T | null {
    try {
      const v = localStorage.getItem(key);
      return v ? (JSON.parse(v) as T) : null;
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* gizli sekme vb. — oturum sadece bellekte kalır */
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* yoksay */
    }
  },
};

export type ConnectionState = 'connecting' | 'online' | 'offline';

/**
 * Tüm oyun durumunu ve sunucu komutlarını tek yerde toplayan hook.
 * Ekranlar sadece bu hook'un döndürdüğü veriyi okur ve fonksiyonları çağırır.
 */
export function useGame() {
  const socketRef = useRef<GameSocket | null>(null);
  const sessionRef = useRef<Session | null>(storage.get<Session>(SESSION_KEY));

  const [connection, setConnection] = useState<ConnectionState>('connecting');
  const [room, setRoom] = useState<PublicRoomState | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(sessionRef.current?.playerId ?? null);
  const [hint, setHint] = useState<PrivateHintPayload | null>(null);
  const [role, setRole] = useState<PrivateRole | null>(null);
  const [serverOffsetMs, setServerOffsetMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [rejoining, setRejoining] = useState(!!sessionRef.current);
  /** Bu sahnede benim gizli oyum (sunucu kimseye geri göndermez, sadece burada tutulur) */
  const [myVote, setMyVote] = useState<{ nodeKey: string; actionId: string } | null>(null);

  const applyState = useCallback((s: PublicRoomState) => {
    setRoom(s);
    if (s.phase === GamePhase.LOBBY) setRole(null);
    setServerOffsetMs(s.serverNow - Date.now());
  }, []);

  const saveSession = useCallback((r: JoinResult) => {
    const session = { code: r.room.code, sessionToken: r.sessionToken, playerId: r.playerId };
    sessionRef.current = session;
    storage.set(SESSION_KEY, session);
    setPlayerId(r.playerId);
    applyState(r.room);
  }, [applyState]);

  const clearSession = useCallback(() => {
    sessionRef.current = null;
    storage.remove(SESSION_KEY);
    setRoom(null);
    setHint(null);
    setRole(null);
    setPlayerId(null);
    setMyVote(null);
  }, []);

  // ───────── Bağlantı ve sunucu olayları ─────────
  useEffect(() => {
    const socket = createSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnection('online');
      // Telefon kilitlendi / sayfa yenilendi: aynı karaktere geri dön
      const session = sessionRef.current;
      if (session) {
        setRejoining(true);
        call<JoinResult>(socket, 'room:rejoin', { code: session.code, sessionToken: session.sessionToken })
          .then(saveSession)
          .catch(() => clearSession())
          .finally(() => setRejoining(false));
      }
    });
    socket.on('disconnect', () => setConnection('offline'));
    socket.on('connect_error', () => setConnection('offline'));
    socket.on('room:state', applyState);
    socket.on('scene:hint', setHint);
    socket.on('player:role', setRole);
    socket.on('room:error', (e) => setError(e.message));

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [applyState, saveSession, clearSession]);

  // ───────── Komutlar ─────────
  const run = useCallback(async <T,>(fn: (s: GameSocket) => Promise<T>): Promise<T | undefined> => {
    const socket = socketRef.current;
    if (!socket) return undefined;
    try {
      setError(null);
      return await fn(socket);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bir şeyler ters gitti');
      return undefined;
    }
  }, []);

  const rememberName = (name: string) => storage.set(NAME_KEY, name);

  const actions = useMemo(
    () => ({
      createRoom: (name: string) =>
        run(async (s) => {
          rememberName(name);
          saveSession(await call<JoinResult>(s, 'room:create', { name }));
        }),
      joinRoom: (code: string, name: string) =>
        run(async (s) => {
          rememberName(name);
          saveSession(await call<JoinResult>(s, 'room:join', { code, name }));
        }),
      leave: () =>
        run(async (s) => {
          await call(s, 'room:leave').catch(() => undefined);
          clearSession();
        }),
      selectClass: (classId: ClassId) => run((s) => call(s, 'class:select', { classId })),
      releaseClass: () => run((s) => call(s, 'class:release')),
      start: () => run((s) => call(s, 'game:start')),
      setMode: (mode: GameMode) => run((s) => call(s, 'room:mode', { mode })),
      setAdventure: (adventureId: AdventureId) => run((s) => call(s, 'room:adventure', { adventureId })),
      curse: () => run((s) => call(s, 'darkness:curse')),
      ready: (ready: boolean, phase: GamePhase, sceneNumber: number) => run((s) => call(s, 'game:ready', { ready, phase, sceneNumber })),
      advance: () => run((s) => call(s, 'game:advance')),
      vote: (actionId: string, nodeKey: string) =>
        run(async (s) => {
          await call(s, 'choice:submit', { actionId });
          setMyVote({ nodeKey, actionId });
        }),
      /** Zarı at; hata olursa reddeder (zar animasyonu durabilsin diye) */
      roll: async (): Promise<SceneResult> => {
        const socket = socketRef.current;
        if (!socket) throw new Error('Bağlantı yok');
        return call<SceneResult>(socket, 'dice:roll');
      },
      dismissError: () => setError(null),
    }),
    [run, saveSession, clearSession],
  );

  const me: PublicPlayer | null = room?.players.find((p) => p.id === playerId) ?? null;
  const gameOver: GameOverInfo | null = room?.gameOver ?? null;
  const nodeKey = room?.scene ? `${room.sceneNumber}:${room.scene.node_id}` : '';
  const currentVote = myVote && myVote.nodeKey === nodeKey ? myVote.actionId : null;
  // Gizli ipucu sadece mevcut sahneye aitse göster
  const currentHint = hint && room?.scene && hint.node_id === room.scene.node_id ? hint : null;

  return {
    connection,
    role,
    rejoining,
    room,
    me,
    hint: currentHint,
    serverOffsetMs,
    error,
    gameOver,
    nodeKey,
    myVote: currentVote,
    savedName: storage.get<string>(NAME_KEY) ?? '',
    ...actions,
  };
}

export type Game = ReturnType<typeof useGame>;
