import { IoIosFunnel } from "react-icons/io"
import Card from "../Card"
import SelectInput from "../SelectInput"
import { FaRegUser } from "react-icons/fa"
import ActorCard from "../ActorCard"
import ButtonRollet from "../ButtonRollet"


export default function SortFilms({
    runRollet,
    filmChoose,
    searchFilm,
    loadingButton,
    genres,
    setChooseGenre,
    actor,
    actorInformation,
    loading,
    clear,
    change,
    save,
    saveButton
}) {
    const checkActor = actorInformation.length === 0 ? [] : actorInformation

    return (
        <>
            <div className={""}>
                <h2 className={"text-4xl text-ink italic"}>Sorteie o <span className={"text-accent"}>filme perfeito</span></h2>
                <p className={"text-xs text-gray-600 font-sans font-medium mt-3"}>Defina gênero ou autor de preferência e deixe nossa roleta escolher o filme ideal para a sua noite.</p>

                <Card filmChoose={filmChoose} saveButton={saveButton} save={save} isActive={runRollet} start={searchFilm} loadingButton={loadingButton}/>
            </div>

            <div className={"bg-surface mx-3 my-4 p-5 rounded-lg border-neutral-300 border-b font-sans"}>
                <div className={"flex items-center gap-3 pb-3 border-b border-b-gray-600"}>
                    <IoIosFunnel fontSize={20} className={"text-accent"}/>
                    <h3 className={"italic text-ink"}>Filtros de Escolha</h3>
                </div>

                <div className={"mt-5"}>
                    <h4 className={"text-[12px] text-gray-400 font-bold mb-2"}>GÊNERO</h4>
                    <SelectInput genres={genres} setGenres={setChooseGenre}/>
                </div>

                <div className={"my-5"}>
                    <div className={"flex justify-between items-center"}>
                        <h4 className={"flex items-center gap-1 mt-3 text-[12px] text-gray-400 font-bold mb-2"}>
                            <FaRegUser fontSize={15} className={"text-accent"}/> ATOR OU ATRIZ
                        </h4>

                        {
                            actor.length > 1 && <p className={"text-[10px] text-accent font-bold cursor-pointer hover:border-b"} onClick={clear}>LIMPAR </p>
                        }
                    </div>
                    <input type="text" className={"w-full p-3 bg-gray-100 border-gray-300 border outline-none focus:border-accent focus:bg-white"} value={actor} onChange={change} placeholder="Digite o nome (ex: DiCaprio, Bale, Zendaya)..."/>
                    {
                        actor.length > 1 && (
                            <ActorCard actorInformation={checkActor} loading={loading} actor={actor}/>
                        )
                    }
                </div>

                <div className={"flex items-center justify-center"}>
                <ButtonRollet start={searchFilm} loadingButton={loadingButton}/>
                </div>
            </div>
        </>
    )
}