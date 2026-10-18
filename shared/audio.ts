import type { AudioCue } from './types';

export const BACKGROUND_TRACK = 'halloween-bells.mp3';
export const AMBIENCE_TRACKS: Record<AudioCue, { file: string; label: string; gain: number }> = {
  cave_wind: { file: 'cave-wind.mp3', label: 'Mağara rüzgârı', gain: 0.65 },
  scary_cave: { file: 'scary-cave.mp3', label: 'Mağaranın karanlığı', gain: 0.75 },
  droplets: { file: 'droplets-in-a-cave.mp3', label: 'Mağaradaki damlalar', gain: 0.8 },
  music_box: { file: 'scary-music-box.mp3', label: 'Müzik kutusu', gain: 0.8 },
};
