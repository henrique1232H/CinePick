import { FaDice } from "react-icons/fa"
import { IoStarSharp } from "react-icons/io5"
import DialogModal from "../DialogModal"
import ButtonRollet from "../ButtonRollet";

export default function Card({isActive, props, start, credits, providersInFilm, trailer, loadingButton}) {
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
                    <img className={"cursor-pointer hover:bg-ink"} src={`https://image.tmdb.org/t/p/w200${props.poster_path}`}/>
                  </DialogModal>

                  <div class={"flex items-center justify-center gap-4 my-3"}>
                    <span class={"bg-ink text-white text-sm px-2 py-1"}>{date}</span>
                    <span class={"flex items-center justify-center gap-1 text-accent bg-neutral-200 border-neutral-300 rounded-lg border-2  py-1 px-2 text-sm "}> <IoStarSharp/> {Math.round(props.vote_average)} / 10 </span>
                    <span class={" border-neutral-300 border-2 text-gray-300 px-2"}>{props.runtime} min</span>
                  </div>

                  <h2 class={"italic font-medium text-lg hover:text-accent"}> {props.title} </h2>
                  <h3 class={"text-gray-300"}> {(director[0].name).toUpperCase()} - {date} </h3>

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

                  <div class={"flex flex-wrap gap-1 items-center"}>
                    <h4>Elenco:</h4>

                    {actorInFilm.map((actor) => {
                        return <p key={actor.id} class={"text-gray-400 text-sm"}> {actor.name},</p>
                    })}
                  </div>

                  {
                    trailer.length > 0 && (
                      <div class={"mt-6 w-full"}>
                        <a href={`https://www.youtube.com/watch?v=${trailer[0].key}`}> 
                          <button class={"bg-ink w-full block p-3 text-white cursor-pointer font-bold font-sans"}> TRAILER</button>
                        </a>
                      </div>
                    )
                  }



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