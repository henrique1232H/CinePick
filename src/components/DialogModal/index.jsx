import { AlertDialog } from "radix-ui";
import { GiFilmStrip } from "react-icons/gi";
import { IoStarSharp } from "react-icons/io5";
import SalvFilmButton from "../SalvFilmButton";
import { CiUser } from "react-icons/ci";
import { WiStars } from "react-icons/wi";

export default function DialogModal({children, filmChoose, save, saveButton}) {
	const { film, credits, providers } = filmChoose;
	const actors = credits.cast.slice(0, 3);
	const director = credits.crew.find((person) => person.job === "Director");
	const brazilProviders = providers?.BR?.flatrate ?? [];
	const date = new Date(film.release_date).getFullYear();

	console.log(saveButton)

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
			<AlertDialog.Overlay className="modal-overlay fixed z-50 inset-0 bg-black/70" />
			<AlertDialog.Content className="modal-content fixed z-50 left-1/2 top-1/2 my-10 h-full w-full max-w-120 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-100 overflow-y-auto scrollbar-thumb-accent scrollbar-track-ink-hover">
				<AlertDialog.Title className="w-full h-auto flex-col justify-center items-center relative">

					<div className="relative w-full flex justify-center items-center">
                        <AlertDialog.Cancel asChild>
                            <button
                                type="button"
                                aria-label="Fechar modal"
                                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center bg-ink border border-ink-hover text-xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-ink-hover"
                            >
                                ×
                            </button>
                        </AlertDialog.Cancel>
						<img className={"w-full"} src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} alt="Banner do filme"/>
						<div className="absolute h-full w-full bg-linear-to-b from-black to-ink/40 text-white p-5"> 
							<span className="font-sans bg-ink py-1 text-[11px] font-bold px-4 border border-gray-600 flex items-center justify-center w-50 gap-1">
								<GiFilmStrip class={"text-accent"}/>
								TRAILER & FICHA TÉCNICA
							</span>
						</div>
                    	<img className={"absolute z-10 top-1/3 border"} src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} alt="Poster do filme" />

					</div>

					<div className={"h-30 bg-linear-to-b from-ink/40 to-white/40 text-white p-5"} />

				</AlertDialog.Title>
				<AlertDialog.Description class=" px-4 py-12 mb-5 mt-3.75 text-[15px] leading-normal text-mauve11">
					<span className={"flex font-sans gap-2 items-center"}>
						<p className={"text-white font-bold py-1 px-2 text-[9px] bg-ink"}>FICHA TÉCNICA</p>
						<p className={"text-gray-400"}>{date}</p>
					</span>

					<h1 className={"mt-3 text-2xl italic"}>{film.title}</h1>

					<h3 className={"text-gray-400 text-[12px] font-sans"}>Título original: {film.original_title} </h3>

					<p className={"text-accent mb-2"}> "{film.tagline}" </p>

					<div className={"flex flex-wrap gap-3 items-center my-4"}>
						<span class={"flex items-center justify-center gap-1 text-accent bg-white font-bold font-sans border-neutral-300 border py-1 px-2 text-sm "}> <IoStarSharp/> {Math.round(film.vote_average)} / 10 </span>
						<span class={" border-neutral-300 border text-gray-600 px-2 bg-white"}>{film.runtime} min</span>
						<span className={"font-sans text-gray-600 text-[12px] font-semibold py-1 px-2 border border-neutral-300 bg-white"}>
							Dir. {director?.name}
						</span>
					</div>

				  <div class={"my-4"}>
					{
						film.genres.map((genre) => {
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
						{film.overview}
					</p>
				  </div>

				  <div className={"mt-3"}>
					<h4 className={"font-sans text-[12px] mb-3 text-gray-600 flex items-center gap-1"}> <CiUser className={"text-accent"}/>  Elenco principal</h4>

					<div className="flex">
						{
							actors.map((actor) => {
							return <span key={actor.id} class={"text-[10px] border-gray-300 flex items-center justify-center gap-1 bg-white border font-semibold font-sans mr-2 py-1 px-3"}>
									<CiUser/>
									{(actor.name)} 
							
									</span>
							})
						}
					</div>

				  </div>

				  <div className={""}>
					<h4 className="font-sans text-gray-600 text-[12px] my-5">ONDE ASSISTIR</h4>
					{brazilProviders.length > 0 ? (
						<div className={"flex flex-wrap gap-2"}>
							{brazilProviders.map((provider) => (
								<span key={provider.provider_id} className={"text-[10px] flex items-center justify-center gap-1 border-gray-300 bg-white border font-semibold font-sans py-1 px-3"}>
									<WiStars fontSize={15} className="text-accent"/>
									{provider.provider_name}
								</span>
							))}
						</div>
					) : <span className={"text-[10px] border-gray-300 bg-white border font-semibold font-sans py-1 px-3"}>
							Stremio
						</span>
					}
					</div>


					{
						saveButton !== undefined && <div className="mt-5"><SalvFilmButton save={save} saveButton={saveButton}/></div>
					}



				</AlertDialog.Description>
			</AlertDialog.Content>
		</AlertDialog.Portal>
        </AlertDialog.Root>
    )
} 