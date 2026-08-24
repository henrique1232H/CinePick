import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import SalvFilmCard from "../SalvFimCard";


export default function ListFilm({listForFilms}) {
    const [isActive, setActive] = useState(false)
    const [buttons] = useState([{name: "TODOS",isActive: true, id: 0}, {name: "PARA ASSISTIR", isActive: false ,id: 1}, {name: "ASSISTIDOS", isActive: false,id: 2}]);
    console.log(listForFilms)

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
                            
                        }}>{button.name} (0)</button>
                    })
                }
            </div>

            {
                listForFilms.length !== 0 ? (
                    <div className="border-gray-300 border-t pt-3 mt-5">
                        {
                            listForFilms.map(({filmChoose, date, status}) => {
                                console.log(filmChoose.id)
                                return <SalvFilmCard key={filmChoose.id} props={filmChoose} date={date} status={status}/>
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