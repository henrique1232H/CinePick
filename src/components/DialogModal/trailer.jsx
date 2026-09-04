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
          <AlertDialog.Title className="w-full h-auto flex-col justify-center items-center relative">
          
          <div className="relative w-full flex justify-between items-center">
            <div className={"flex items-center justify-center p-3 gap-2 font-sans"}>
              <GiFilmStrip className={"text-accent text-[30px]"} />

              <div>
                <h3 className={"text-accent font-bold text-[12px]"}>MINI BIOGRAFIA DO ARTISTA</h3>
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


        </AlertDialog.Description>
        
        </>
      )}
    </AlertDialog.Content>
  );
}