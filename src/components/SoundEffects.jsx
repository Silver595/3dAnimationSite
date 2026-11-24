import { forwardRef, useEffect, useImperativeHandle } from "react";
import useSound from "use-sound";

const SoundEffects = forwardRef(function SoundEffects(_, ref) {
  // UISFX CC0 clips from the Mechanical and Zen packs.
  const [play, { sound, stop }] = useSound("/audio/interface.wav", {
    volume: 0.32,
    interrupt: true,
    sprite: {
      hover: [0, 122],
      click: [160, 163],
      focus: [360, 207],
      typing: [600, 87],
      submit: [720, 316],
      sent: [1060, 571],
    },
  });

  useImperativeHandle(ref, () => ({
    play: (id) => play({ id }),
    stop,
  }), [play, stop]);

  // The hook loads its Howl asynchronously. Unload it if the page is left.
  useEffect(() => () => sound?.unload(), [sound]);

  return null;
});

export default SoundEffects;
