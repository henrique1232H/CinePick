import { GiFilmStrip } from "react-icons/gi";

export default function Header() {
  return (
    <header className={"bg-surface fixed top-0 z-10 w-full mb-5"}>
      <nav>
        <ul>
          <li>
            <div className={"flex items-center justify-start gap-1.5 border-b border-neutral-300 p-4 cursor-pointer"}>
              <GiFilmStrip fontSize={20} className={"text-accent text-3xl bg-ink p-1.5 rounded-xs"} />
              <h1 className={"text-gray-900 text-xl font-medium"}>
                CinePick <span className={"text-accent text-xs font-bold tracking-widest"}>EDITORIAL</span>
              </h1>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}