import { FaRegTrashAlt, FaStar } from "react-icons/fa";
import DialogModal from "../DialogModal"
import { MdMessage } from "react-icons/md";
import { useState } from "react";


export default function SalvFilmCard({props, date, status, removeFilm, addNote, noteCard, children}) {
    const [isActive, setIsActive] = useState(false)
    const { film } = props;
    const dateFilm = new Date(film.release_date).getFullYear()

    return (
        <div className="flex items-center bg-white p-2 mt-4 border border-gray-300 gap-3 hover:border-ink-hover transition-all w-full h-auto font-sans">
            <div>
                <DialogModal filmChoose={props}>
                    <img src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} alt={film.title} className={"h-40 w-35 border border-gray-300 cursor-pointer"}/>
                </DialogModal>
            </div>

            <div className="h-full w-full flex justify-between p-2">
                <div>
                    <p className={"text-accent text-[11px] font-bold font-sans mb-2"}> SALVO EM {date}</p>


                    <DialogModal filmChoose={props}>
                        <h4 className={"cursor-pointer hover:text-accent transition-all text-ink font-italic"}>{film.title}</h4>
                    </DialogModal>

                    <div>
                        <p className={"flex text-gray-500 items-center gap-1 text-[12px] mt-1 font-sans font-semibold"}> <span className="text-accent font-bold flex gap-1 items-center"> <FaStar /> {film.vote_average.toFixed(1)}</span>  • {dateFilm} • {film.genres[0].name} </p>
                    </div>

                    <div className={"mt-2"}>
                        {
                            !isActive ? (
                                <button className={"flex items-center gap-1 text-gray-600 font-sans text-[13px] cursor-pointer hover:text-ink"} onClick={() => setIsActive(!isActive)}>
                                    <MdMessage className={"text-accent"}/> {noteCard === "" ? "+ Adicionar nota pessoal" : `Nota:"${noteCard}" `} 
                                </button>
                            ) : (
                                <div className={"bg-gray-100 border border-gray-200 p-1.5"}>
                                    {children}

                                    <div className={"flex gap-2 mt-2 font-semibold  text-[12px] justify-center"}> 
                                        <button className={"p-4 bg-ink text-white w-full cursor-pointer"} onClick={() => {setIsActive(false); addNote()}}>SALVAR NOTA</button>
                                        <button className={"p-4 bg-gray-300 cursor-pointer"} onClick={() => setIsActive(!isActive)}>CANCELAR</button>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>

                <div>
                    <button className="cursor-pointer rounded-lg text-gray-400 hover:bg-red-200/90 hover:text-red-700 transition-all p-1" onClick={removeFilm}>
                        <FaRegTrashAlt/>
                    </button>

                </div>
            </div>

        </div>
    )
}