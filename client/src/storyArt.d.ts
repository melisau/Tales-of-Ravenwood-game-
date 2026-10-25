declare module 'virtual:story-art' {
  /** `<node>:scene` ya da `<node>:<action>:success|fail` → görsel adresi (client/storyArtPlugin.ts) */
  const STORY_ART: Readonly<Record<string, string>>;
  export default STORY_ART;
}
