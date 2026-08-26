import { FaRegTrashAlt } from "react-icons/fa";
import DialogModal from "../DialogModal"


export default function SalvFilmCard({props, date, status, removeFilm}) {
    const { film } = props;

    return (
        <div className="flex items-center bg-white p-2 mt-4 border border-gray-300 gap-3 hover:border-ink-hover transition-all w-full h-44">
            <div>
                <DialogModal filmChoose={props}>
                    <img src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} alt={film.title} className={"h-40 w-35 border border-gray-300 cursor-pointer"}/>
                </DialogModal>
            </div>

            <div className="h-full w-full flex justify-between p-2">
                <div>
                    <p className={"text-accent text-[11px] font-bold font-sans mb-2"}> SALVO EM {date}</p>


                    <DialogModal filmChoose={props}>
                        <h4 className={"cursor-pointer hover:text-accent transition-all text-ink"}>{film.title}</h4>
                    </DialogModal>
                </div>

                <div>
                    <button className="cursor-pointer rounded-lg text-gray-400 hover:bg-red-200/90 hover:text-red-700 transition-all p-1" onClick={removeFilm}>
                        <FaRegTrashAlt className=""/>
                    </button>

                </div>
            </div>

        </div>
    )
}