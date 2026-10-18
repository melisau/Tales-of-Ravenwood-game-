import { useState, type ReactElement } from 'react';
import { GamePhase } from '../../shared/types';
import GuideScreen, { type GuideTab } from './components/GuideScreen';
import { GameOverScreen } from './screens/GameOverScreen';
import { GameScreen } from './screens/GameScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { useGame } from './state/useGame';
import { StoryAudio } from './components/StoryAudio';
import { Backdrop, ConnectionBanner, Title, Toast } from './ui/kit';

const SEEN_GUIDE_KEY = 'ravenwood.seenGuide';

function hasSeenGuide(): boolean {
  try {
    return localStorage.getItem(SEEN_GUIDE_KEY) === '1';
  } catch {
    return true;
  }
}

type Overlay = { kind: 'guide'; tab: GuideTab } | { kind: 'pickClass' } | null;

/**
 * Ekran yönlendirmesi tamamen sunucudan gelen faza göre yapılır:
 * odada değilsen ana menü, LOBBY'de lobi, GAME_OVER'da son ekranı, diğer
 * tüm fazlarda oyun ekranı. Böylece telefonlar her zaman senkron kalır.
 */
export default function App() {
  const game = useGame();
  // İlk açılışta rehber otomatik gösterilir
  const [overlay, setOverlay] = useState<Overlay>(() => (hasSeenGuide() ? null : { kind: 'guide', tab: 'howto' }));

  const closeOverlay = () => {
    try {
      localStorage.setItem(SEEN_GUIDE_KEY, '1');
    } catch {
      /* yoksay */
    }
    setOverlay(null);
  };

  const room = game.room;
  const me = game.me;

  let screen: ReactElement;
  if (overlay?.kind === 'guide') {
    screen = <GuideScreen initialTab={overlay.tab} playerCount={room?.players.length} takenClasses={room?.takenClasses} onContinue={closeOverlay} continueLabel={room ? 'Oyuna Dön' : 'Masaya Otur'} />;
  } else if (overlay?.kind === 'pickClass' && room?.phase === GamePhase.LOBBY) {
    screen = (
      <GuideScreen
        initialTab="classes"
        takenClasses={room.takenClasses}
        mySelectedClass={me?.classId ?? null}
        playerCount={room.players.length}
        onSelectClass={async (classId) => {
          await game.selectClass(classId);
        }}
        onContinue={closeOverlay}
        continueLabel={me?.classId ? 'Lobiye Dön' : 'Vazgeç'}
      />
    );
  } else if (!room || !me) {
    screen = game.rejoining ? (
      <Backdrop>
        <div className="grid flex-1 place-items-center text-center">
          <div>
            <Title>Tales of Ravenwood</Title>
            <p className="mt-4 italic text-[#c9b48a]">Masana geri dönülüyor…</p>
          </div>
        </div>
      </Backdrop>
    ) : (
      <HomeScreen game={game} onOpenGuide={(tab) => setOverlay({ kind: 'guide', tab })} />
    );
  } else if (room.phase === GamePhase.LOBBY) {
    screen = (
      <LobbyScreen game={game} onPickClass={() => setOverlay({ kind: 'pickClass' })} onOpenGuide={() => setOverlay({ kind: 'guide', tab: 'howto' })} />
    );
  } else if (room.phase === GamePhase.GAME_OVER && game.gameOver) {
    screen = <GameOverScreen game={game} />;
  } else {
    screen = <GameScreen game={game} onOpenGuide={() => setOverlay({ kind: 'guide', tab: 'howto' })} />;
  }

  return (
    <>
      <ConnectionBanner state={game.connection} />
      <StoryAudio room={room} />
      {screen}
      {game.error && <Toast message={game.error} onClose={game.dismissError} />}
    </>
  );
}
