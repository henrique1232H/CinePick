import { GiFilmStrip } from "react-icons/gi";


export default function Header() {

    return (
        <header class={"bg-surface"}>
            <nav>
                <ul>
                    <li>
                        <div class={"flex items-center justify-start gap-1.5 border-b border-neutral-300 p-4 cursor-pointer"}>
                            <GiFilmStrip fontSize={20} class={"text-accent text-3xl bg-ink p-1.5 rounded-xs"}/>
                            <h1 class={"text-gray-900 text-xl font-medium"}>CinePick <span class={"text-accent text-xs font-bold tracking-widest"}>EDITORIAL</span></h1>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}