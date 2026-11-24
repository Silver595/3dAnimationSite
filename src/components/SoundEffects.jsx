import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Howl, Howler } from "howler";

// UISFX CC0 clips from the Mechanical and Zen packs.
const sprite = {
  hover: [0, 122],
  click: [160, 163],
  focus: [360, 207],
  typing: [600, 87],
  submit: [720, 316],
  sent: [1060, 571],
};

const SoundEffects = forwardRef(function SoundEffects(_, ref) {
  const sound = useRef(null);
  useImperativeHandle(ref, () => ({
    enable() {
      sound.current ??= new Howl({ src: ["/audio/interface.wav"], volume: 0.85, sprite });
      Howler.ctx?.resume().catch(() => {});
    },
    play(id) {
      if (sound.current?.state() === "loaded") sound.current.play(id);
    },
  }), []);

  useEffect(() => () => {
    sound.current?.unload();
    sound.current = null;
  }, []);

  return null;
});

export default SoundEffects;
