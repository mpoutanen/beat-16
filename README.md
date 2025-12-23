# Beat 16 - More Cowbells edition!

Simple 16 step sequencer pulled together with React and [Tone.js](https://tonejs.github.io/)

## Features

- Author magical beats with 4 distinguished 808 samples: Kick, snare, hihat and cowbell(!)
- Control sequencer with start / stop
- Clear sequence pattern to start all over
- Set BPM from walking speed 🚶 to HEAT 🔥 level

## Architecture

```
┌─────────────────┐
│     Player      │  ← UI & user interaction
└────────┬────────┘
         │
    ┌────┴────────────────────┐
    │                         │
┌───▼──────────────┐  ┌───────▼──────────────┐
│ useSequencerGrid │  │ useSequencerTransport│
│  (state logic)   │  │  (timing/playback)   │
└──────────────────┘  └──────┬───────────────┘
                             │
                      ┌──────▼──────────┐
                      │ useAudioEngine  │
                      │  (sound output) │
                      └─────────────────┘
```
