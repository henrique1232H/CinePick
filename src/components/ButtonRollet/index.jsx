import { Ring } from "ldrs/react";
import { FaDice } from "react-icons/fa";

export default function ButtonRollet({ loadingButton, start }) {
  return (
    <button
      onClick={start}
      disabled={loadingButton}
      className={"bg-ink transition-all hover:bg-ink-hover flex items-center justify-center gap-2 px-6 py-3 border-accent border-2 text-white font-sans font-semibold cursor-pointer w-full"}
    >
      {loadingButton ? (
        <span className={"flex items-center gap-2"}>
          <Ring size={"30"} color="#fff" />
          Espere o filme ser escolhido
        </span>
      ) : (
        <span className={"flex gap-2 items-center"}>
          <FaDice fontSize={20} className={"text-accent"} />
          GIRAR ROLETA AGORA
        </span>
      )}
    </button>
  );
}