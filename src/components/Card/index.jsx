import { FaDice, FaPlay } from "react-icons/fa"
import { IoStarSharp } from "react-icons/io5"
import DialogModal from "../DialogModal"
import ButtonRollet from "../ButtonRollet";


export default function Card({isActive, props, start, credits, providersInFilm, trailer, loadingButton, save, saveButton}) {
    let actorInFilm = []
    let director;
    let date;
    
    if (isActive) {
        actorInFilm = [credits.cast[0], credits.cast[1], credits.cast[2]]
        director = credits.crew.filter((e) => e.job === "Director");
        date = new Date(props.release_date).getFullYear();
    }

    return (
        <div class={"bg-surface mx-3 my-4 p-5 px-9 flex-wrap rounded-lg border-neutral-300 border-b font-sans"}>
            {isActive ? (
                <div class={"flex py-5 justify-center items-center flex-col"}>

                  <DialogModal props={props} credits={director} actors={actorInFilm} providers={providersInFilm}>
                    <img className={"cursor-pointer shadow-lg shadow-gray-200"} src={`https://image.tmdb.org/t/p/w200${props.poster_path}`} alt={props.title}/>
                  </DialogModal>

                  <div class={"flex items-center justify-center gap-4 my-3"}>
                    <span class={"bg-ink text-white text-[9px] font-bold px-3 py-1"}>{date}</span>
                    <span class={"flex items-center justify-center gap-1 text-accent bg-gray-100/70 border-neutral-300 border px-2 text-[12px] font-bold"}> <IoStarSharp/> {Math.round(props.vote_average)} / 10 </span>
                    <span class={" border-neutral-300 border text-gray-300 px-2 text-[12px]"}>{props.runtime} min</span>
                  </div>

                  <h2 class={"italic font-medium text-lg hover:text-accent"}> {props.title} </h2>
                  <h3 class={"text-gray-300 font-semibold"}> {(director[0].name).toUpperCase()} - {date} </h3>

                  <div class={"my-4 flex gap-1 flex-wrap items-center justify-center"}>
                    {
                      props.genres.map((genre) => {
                        return <span key={genre.id} class={"text-xs border-gray-300 border-2 mr-2 py-1 px-3"}> {(genre.name).toUpperCase()} </span>
                      })
                    }
                  </div>
                    
                  <span class={"h-2 block w-full border-neutral-300 border-b my-3"}/>

                  {
                    props.overviey === "" ? (
                     <div class={"my-2 text-sm h-18"}>
                       <p class={"text-gray-600"}>Esse filme não possui nenhuma sinopse</p>
                     </div>   
                    ) : (
                        <div class={"my-2 text-sm h-18 overflow-y-scroll"}>
                            <p class={"text-gray-600"}>{props.overview}</p>
                        </div>   
                    )
                  }


                  <span class={"h-2 block w-full border-neutral-300 border-b my-3"}/>

                  <div class={"flex text-[12px] justify-center flex-wrap gap-1 items-center"}>
                    <h4>Elenco:</h4>

                    {actorInFilm.map((actor) => {
                        return <p key={actor.id} class={"text-gray-400"}> {actor.name},</p>
                    })}
                  </div>

                  <div className="mt-4 mb-1 w-full font-semibold">
                    <DialogModal props={props} credits={director} actors={actorInFilm} providers={providersInFilm}>
                      <button className="bg-ink w-full p-2 text-white font-sans cursor-pointer hover:bg-ink/90 transition-all">VER FICHA TÉCNICA</button>
                    </DialogModal>
                  </div>

                  <div className={"flex items-center gap-2 mt-1 w-full"}>
                    {
                      trailer.length > 0 && (
                        <a href={`https://www.youtube.com/watch?v=${trailer[0].key}`} className={"w-full"}>
                          <button class={"bg-ink w-full flex items-center justify-center gap-1.5 px-6 py-3 text-white cursor-pointer font-bold font-sans transition-all hover:bg-ink-hover"}>
                            <FaPlay />
                            TRAILER
                          </button>
                        </a>
                      )
                    }

                    <button onClick={save} className={`${!saveButton ? "bg-white hover:bg-gray-100" : "bg-accent text-white border-none"}  w-full cursor-pointer text-ink border border-gray-300 p-3 font-semibold transition-all hover:${!saveButton  ? "bg-gray-100" : "bg-accent"}`}>
                      
                      {
                        !saveButton ?  "SALVAR" : "SALVO"
                      }
                    </button>
                  </div>





                </div>
            ): (
                <div class={"mt-6 py-5 flex justify-center items-center flex-col gap-5"}>
                    <span class={"bg-ink flex justify-center flex-wrap items-center h-15 w-15 border-accent border-2"}>
                        <FaDice fontSize={35} class={"text-accent"}/>
                    </span>
                    <h3 class={"italic text-2xl mt-3"}>Pronto para a Escolha Perfeita?</h3>
                    <p class={"text-xs text-gray-700 font-sans font-medium w-80"}>Nenhum filme selecionado ainda. Ajuste seus filtros de gênero ou ator ao lado e clique no botão abaixo para girar a roleta.</p>

                <ButtonRollet start={start} loadingButton={loadingButton}/>
                </div>
            )}
        </div>
    )
}