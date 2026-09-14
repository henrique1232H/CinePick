import { IoStarSharp } from "react-icons/io5";

export default function FilmStats({ voteAverage, date, runtime }) {
  return (
    <div className="mt-5 grid w-full grid-cols-3 overflow-hidden border border-gray-300 bg-gray-100">
      <div className="flex min-w-0 flex-col items-center justify-center gap-1 border-r border-gray-300 bg-gray-100/70 px-2 py-2 text-center text-[12px] font-bold text-gray-400 transition-all hover:bg-gray-200">
        NOTA
        <span className="flex items-center gap-2">
          <IoStarSharp className="text-yellow-300" />
          <span className="font-bold text-ink">{voteAverage.toFixed(1)}</span> / 10
        </span>
      </div>

      <span className="flex min-w-0 flex-col items-center justify-center px-2 py-2 text-center text-[9px] font-bold text-gray-400 transition-all hover:bg-gray-200">
        LANÇAMENTO
        <span className="mt-2 text-[11px] text-ink">{date}</span>
      </span>

      <span className="flex min-w-0 flex-col items-center justify-center border-l border-gray-300 px-2 py-2 text-center text-[9px] font-bold text-gray-400 transition-all hover:bg-gray-200">
        DURAÇÃO
        <span className="mt-2 text-[11px] font-bold text-ink">{runtime} min</span>
      </span>
    </div>
  );
}
