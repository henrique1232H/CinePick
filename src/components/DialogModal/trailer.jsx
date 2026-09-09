import { AlertDialog } from "radix-ui";
import { GiFilmStrip } from "react-icons/gi";

export default function Trailer({ props, date, actorInformation = false }) {

  console.log(actorInformation)

  return (
    <AlertDialog.Content className="modal-content fixed z-50 left-1/2 top-1/2 my-10 h-90 w-full max-w-120 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-ink border-accent border-2 overflow-y-auto scrollbar-thumb-accent scrollbar-track-ink-hover">

      {!actorInformation ? (
        <div>
          <AlertDialog.Title className="w-full h-auto flex-col justify-center items-center relative">
          
          <div className="relative w-full flex justify-between items-center">
            <div className={"flex items-center justify-center p-3 gap-2 font-sans"}>
              <GiFilmStrip className={"text-accent text-[30px]"} />

              <div>
                <h3 className={"text-accent font-bold text-[12px]"}>TRAILER OFICIAL</h3>
                <h4 className={"text-white font-serif text-[11px]"}>{props.film.title} ({date})</h4>
              </div>
            </div>
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                aria-label="Fechar modal"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center bg-ink-hover border rounded border-ink-hover text-xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-ink-hover/80"
              >
                ×
              </button>

            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Title>

        <AlertDialog.Description className="mt-3.75 text-[15px] leading-normal text-mauve11">
          <iframe
            className={"w-full h-60"}
            title={props.film.title}
            src={`https://www.youtube.com/embed/${props.trailer.key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AlertDialog.Description>
        </div>
      ) : (
        <>
          <AlertDialog.Title className="w-full h-auto flex-col justify-center items-center fixed top-0">
          
            <div className="relative w-full flex justify-between items-center border-b border-gray-700 h-14">
              <div className={"flex items-center justify-center p-3 gap-2 font-sans"}>
                <span className={"rounded-xl bg-accent h-3 w-3"}/>
                
                <GiFilmStrip className={"text-accent text-[15px]"} />

                <div>
                  <h3 className={"text-accent font-bold text-[12px]"}>MINI BIOGRAFIA DO ARTISTA</h3>
                </div>
              </div>
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  aria-label="Fechar modal"
                  className="absolute right-4 top-3 z-20 flex h-9 w-9 items-center justify-center bg-ink-hover border border-ink-hover text-xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-ink-hover/80 rounded-xl"
                >
                  ×
                </button>

              </AlertDialog.Cancel>
            </div>
        </AlertDialog.Title>

        <AlertDialog.Description className="mt-14 text-[15px] leading-normal text-mauve11 bg-ink-hover/30">
          <div className="flex items-center justify-center flex-col pt-5">
            <img src={`https://image.tmdb.org/t/p/w200${actorInformation.profile_path}`} className={"h-60 border-gray-500 border-2"} alt="" />

            <h1 className={"mt-3 text-2xl text-white"}>{actorInformation.original_name}</h1>

            <div className="flex gap-4 text-white font-sans text-[12px]">
              <span className={" border bg-ink-hover/40 border-gray-600 py-0.5 px-3"}> {actorInformation.place_of_birth} </span>
              <span className={" border bg-ink-hover/40 border-gray-600 py-0.5 px-3"}>{actorInformation.birthday}</span>
            </div>

            <div className="bg-accent/10 mt-5 p-5 mx-9 border border-gray-700">
              <h2 className={"text-accent font-sans font-semibold"}>TRAJETÓRIA & BIOGRAFIA</h2>

              <p className={"text-white"} >{actorInformation.biography}</p>
            </div>

            <div>
              <div>
                <span>FILME DE DESTAQUE</span>
                <p>{}</p>
              </div>

            </div>
          </div>
        </AlertDialog.Description>
        
        </>
      )}
    </AlertDialog.Content>
  );
}