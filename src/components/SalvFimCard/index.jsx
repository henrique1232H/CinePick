import { FaEye, FaPlay, FaRegTrashAlt } from "react-icons/fa";
import DialogModal from "../DialogModal";
import FilmStats from "../FilmStats";
import chroma from "chroma-js";

export default function SalvFilmCard({ props, date, status, removeFilm, markDone }) {
  const { film } = props;
  const colors = props.colors ?? [];
  const palette = colors[0]?.hexColors ?? [];
  const softColor = chroma(palette[2]).alpha(0.16).css();
  const dateFilm = new Date(film.release_date).getFullYear();



  return (
    <div 
      className={`relative bg-white border-x border-b border-gray-300 px-3 py-4 mt-4 gap-3 ${!status ? "hover:shadow-2xl" : "border-none"} transition-all w-full h-auto font-sans`} 
      style={{borderTop:`5px solid ${palette[1] ?? palette[0] ?? "#d1d5db"}`, backgroundColor: "#ffffff",
        backgroundImage: palette[0]
          ? `linear-gradient(120deg, ${softColor} 10%, rgba(255, 255, 255, 0.92) 22%, #ffffff 42%, #ffffff 100%)`
          : undefined,
        transition: "300ms ease-in"}}>

          
      <div className={`absolute top-0 ${status ? "bg-white/30 z-10" : "bg-none -z-10"} w-full h-full`} />

      <div className="flex w-full gap-3">
        <DialogModal filmChoose={props}>
          <div className="group relative w-20 shrink-0 overflow-hidden shadow-lg">
                  <img
                    className="w-full cursor-pointer object-cover border-2 border-gray-500 shadow-2xl shadow-gray-950"
                    style={{border: `2px solid ${colors[0]}`}}
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    crossOrigin="anonymous"
                    alt={film.title}
                  />
                  <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-ink/90 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border border-gray-400 bg-ink px-1 py-1 font-sans text-white">
                      VER FICHA
                    </span>
                  </div>
                </div>
        </DialogModal>

        <div className="w-full">

          <div className="flex items-center justify-between w-60">
            <p className={"text-[10px] bg-(--background)/30 font-bold font-sans mb-2 px-3 py-1"} style={{"--background": colors[0].hexColors[1], color: colors[0].hexColors[4], border: `1px solid ${colors[0].hexColors[1]}`}}>SALVO EM {date}</p>

            <div className={""}>
              <button
                className="cursor-pointer rounded-lg text-gray-400 hover:bg-red-200/90 hover:text-red-700 transition-all p-1"
                onClick={removeFilm}
              >
                <FaRegTrashAlt />
              </button>
            
            </div>
          </div>

          <DialogModal filmChoose={props}>
            <h1 className={"cursor-pointer hover:text-accent text-[20px] transition-all text-ink"}>{film.title}</h1>
          </DialogModal>
        </div>


      </div>

      <div className="h-full w-full flex p-2">
        <div className="flex flex-col gap-2 w-full">

          <div>
            <FilmStats 
                date={dateFilm}
                voteAverage={film.vote_average}
                runtime={film.runtime}
            />
          </div>

  
          <div className={"flex gap-2 mt-2 mb- font-semibold p-2 text-[12px] justify-center border-t-gray-300 border-t w-full"}>
            <DialogModal isCard={false} filmChoose={props}>
              <button className={"bg-red-600 flex items-center justify-center gap-1.5 px-6 py-3 z-10 text-white cursor-pointer font-bold font-sans transition-all hover:bg-red-600/70"}>
                <FaPlay />
                TRAILER
              </button>
            </DialogModal>

            <button
              className={`w-full ${!status ? "bg-ink hover:bg-ink-hover" : "bg-accent hover:bg-accent/80"} z-10 text-white cursor-pointer transition-all`}
              onClick={markDone}
            >
              {!status ? (
                <span className="flex items-center justify-center gap-1.5">
                  <FaEye />
                  MARCAR ASSISTIDO
                </span>
              ) : (
                <span className="">ASSISTIDO</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}