import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import SalvFilmCard from "../SalvFimCard";


export default function ListFilm({listForFilms, setListForFilm, save, saveButton}) {
    const [isActive, setActive] = useState(false)
    const [buttons] = useState([{name: "TODOS",isActive: true, id: 0}, {name: "PARA ASSISTIR", isActive: false ,id: 1}, {name: "ASSISTIDOS", isActive: false,id: 2}]);
    const filmStatusTodos = listForFilms.filter(({status}) => status === "todos");
    const [noteFilm, setNoteFilm] = useState("")


    return (
        <div>
            
            <div>
                <h2 className={"flex items-center gap-2 text-ink-hover text-2xl"}>
                    <FaRegSave className={"text-accent"}/>
                    Minha Lista Editorial
                </h2>
                <p className={"font-sans text-[12px] text-gray-500 mt-1"}>Seus filmes salvos para assistir</p>
            </div>

            <div className={"flex my-3 p-1 gap-4 font-sans border border-gray-300 text-[12px] text-gray-500 font-semibold"}>
                {
                    buttons.map((button) => {
                        return <button key={button.id} className={`${button.isActive ? "bg-ink text-white" : "bg-none"} transition-all p-2 cursor-pointer`} onClick={() => {
                            if(!button.isActive) {
                                const disabledOtherButton = buttons.filter((button => button.isActive === true));
                                button.isActive = true
                                disabledOtherButton.forEach((button) => {
                                    button.isActive = false
                                })
                                setActive(!isActive)
                            }

                            
                        }}>{button.name} ( {button.id !== 2 ? listForFilms.length : 0} ) </button>
                    })
                }
            </div>

            {
                listForFilms.length !== 0 ? (
                    <div className="border-gray-300 border-t pt-3 mt-5">
                        {
                            listForFilms.map(({filmChoose, date, status, note}) => {
                                return <SalvFilmCard key={filmChoose.film.id} noteCard={note} props={filmChoose} date={date} status={status} save={save} saveButton={saveButton} removeFilm={() => {
                                    const remove = listForFilms.filter((filmToRemove) => filmToRemove.filmChoose.film.id !== filmChoose.film.id);
                                    setListForFilm(remove)
                                }} addNote={() => {
                                        setListForFilm((currentFilms) => currentFilms.map((filmToEdit) => {
                                            if (filmToEdit.filmChoose.film.id !== filmChoose.film.id) {
                                                return filmToEdit;
                                            }

                                            return {...filmToEdit, note: noteFilm};
                                        }))
                                        
                                        setNoteFilm("");
                                }}> 
                                    <input type="text" placeholder={noteFilm === "" ? "Adicione sua nota...": note} className="border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 w-full focus:ring-blue-500" value={noteFilm} onChange={(e) => {
                                        setNoteFilm(e.target.value)
                                    }} />
                                </SalvFilmCard>
                            })
                        }
                    </div>
                ) : (
                    <div>
                        asas
                    </div>
                )
            }


        </div>
    )
}