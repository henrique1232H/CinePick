import { AlertDialog } from "radix-ui";
import { GiFilmStrip } from "react-icons/gi";
import { IoStarSharp } from "react-icons/io5";
import { api } from "../../service/api";


export default function DialogModal({children,props, credits, actors, providers}) {

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
			<AlertDialog.Overlay className="fixed inset-0 bg-black/70" />
			<AlertDialog.Content className="fixed left-1/2 top-1/2 my-10 h-full w-full max-w-120 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-100 overflow-y-auto">
				<AlertDialog.Title className="w-full h-auto flex-col justify-center items-center relative">

					<div className="relative w-full flex justify-center items-center">
                        <AlertDialog.Cancel asChild>
                            <button
                                type="button"
                                aria-label="Fechar modal"
                                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-black/80"
                            >
                                ×
                            </button>
                        </AlertDialog.Cancel>
						<img className={"w-full rounded-b-lg"} src={`https://image.tmdb.org/t/p/w500${props.backdrop_path}`} alt="Banner do filme"/>
						<span className="z-10 absolute bg-ink/70"/>
                    	<img className={"absolute z-10 top-1/3 border"} src={`https://image.tmdb.org/t/p/w200${props.poster_path}`} alt="Poster do filme" />

					</div>

					<div className={"h-30"} />

				</AlertDialog.Title>
				<AlertDialog.Description class=" px-4 py-12 mb-5 mt-3.75 text-[15px] leading-normal text-mauve11">
					<span className={"flex font-sans gap-2 items-center"}>
						<p className={"text-white font-bold py-1 px-2 text-[9px] bg-ink"}>FICHA TÉCNICA</p>
						<p className={"text-gray-400"}>{props.release_date[0]}{props.release_date[1]}{props.release_date[2]}{props.release_date[3]}</p>
					</span>

					<h1 className={"mt-3 text-2xl italic"}>{props.title}</h1>

					<h3 className={"text-gray-400 text-[12px] font-sans"}>Título original: {props.original_title} </h3>

					<p className={"text-accent mb-2"}> "{props.tagline}" </p>

					<div className={"flex flex-wrap gap-3 items-center my-4"}>
						<span class={"flex items-center justify-center gap-1 text-accent bg-white font-bold font-sans border-neutral-300 border py-1 px-2 text-sm "}> <IoStarSharp/> {Math.round(props.vote_average)} / 10 </span>
						<span class={" border-neutral-300 border text-gray-600 px-2 bg-white"}>{props.runtime} min</span>
						<span className={"font-sans text-gray-600 text-[12px] font-semibold py-1 px-2 border border-neutral-300 bg-white"}>
							Dir. {credits[0].name}
						</span>
					</div>

				  <div class={"my-4"}>
					{
					  props.genres.map((genre) => {
						return <span key={genre.id} class={"text-[10px] border-gray-300 bg-gray-200/40 border font-semibold font-sans mr-2 py-1 px-3"}> {(genre.name).toUpperCase()} </span>
					  })
					}
				  </div>

				  <div>
					<h4 className={"flex font-sans text-[12px] text-gray-600 items-center gap-2"}>
						<GiFilmStrip class={"text-accent"}/>
						SINOPSE
					</h4>

					<p className={"mt-4 font-sans text-[14px] bg-white border border-gray-200 p-4 text-gray-600"}> 
						{props.overview}
					</p>
				  </div>

				  <div className={"mt-3"}>
					<h4 className={"font-sans text-[12px] mb-3 text-gray-600"}>Elenco principal</h4>

					{
					  actors.map((actor) => {
						return <span key={actor.id} class={"text-[10px] border-gray-300 bg-white border font-semibold font-sans mr-2 py-1 px-3"}> {(actor.name)} </span>
					  })
					}

				  </div>

				  <div>
					<h4 className="font-sans text-gray-600 text-[12px] my-5">ONDE ASSISTIR</h4>

					{
					  providers.map((provider) => {
						return <span key={provider.id} class={"text-[10px] border-gray-300 bg-white border font-semibold font-sans mr-2 py-1 px-3"}> {(provider.provider_name)} </span>
					  })
					}


				  </div>


				</AlertDialog.Description>
			</AlertDialog.Content>
		</AlertDialog.Portal>
        </AlertDialog.Root>
    )
} 