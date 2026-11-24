import { useEffect, useRef } from "react";

const buttonClass = "min-h-14 rounded-[3px] border border-zinc-700/70 bg-[#121212] px-2 text-xs shadow-xl hover:border-zinc-500 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-paper hover:focus-visible:outline-ink sm:text-sm";

export default function SoundChoice({ onChoose }) {
  const dialogRef = useRef(null);
  const silentRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    silentRef.current.focus();
    return () => dialog.close();
  }, []);

  const choose = (enabled) => {
    dialogRef.current.close();
    onChoose(enabled);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Choose a theme"
      onCancel={(event) => {
        event.preventDefault();
        choose(false);
      }}
      className="sound-choice m-auto w-[calc(100%-2rem)] max-w-[26rem] bg-transparent p-1 text-paper"
    >
      <div className="grid grid-cols-2 gap-6 sm:gap-9">
        <button
          type="button"
          onClick={() => choose(true)}
          aria-label="Colorful, with sound"
          className={buttonClass}
        >
          Colorful
        </button>
        <button
          ref={silentRef}
          type="button"
          onClick={() => choose(false)}
          aria-label="Colorless, without sound"
          className={buttonClass}
        >
          Colorless
        </button>
      </div>
    </dialog>
  );
}
