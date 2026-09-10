import { FaDice, FaPlay } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import DialogModal from "../DialogModal";
import ButtonRollet from "../ButtonRollet";
import SalvFilmButton from "../SalvFilmButton";
import { useEffect, useRef } from "react";
import { getPaletteSync } from "colorthief";

export default function Card({ isActive, filmChoose, start, loadingButton, save, saveButton }) {
  const film = filmChoose?.film;
  const credits = filmChoose?.credits;
  const actorInFilm = credits?.cast
  const director = credits?.crew?.filter((person) => person.job === "Director");
  const date = film ? new Date(film.release_date).getFullYear() : null;
  const imageRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const image = imageRef.current;
    if (!image) return;

    const getColors = () => {
      const palette = getPaletteSync(image, 6);
      const hexColors = palette.map((color) => color.hex());

      console.log(hexColors);
    };

    if (image.complete && image.naturalWidth > 0) {
      getColors();
    } else {
      image.addEventListener("load", getColors);
      return () => image.removeEventListener("load", getColors);
    }
  }, [isActive, filmChoose?.film?.poster_path]);

  return (
    <div className={"bg-surface flex-wrap rounded-lg border-neutral-300 border font-sans mt-4"}>
      {isActive ? (
        <div className={"relative"}>

          <div className="absolute top-0 w-full border-b border-gray-500">
            <img src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} alt="" className="top-0 w-full h-45 left-0 object-cover"/>

            <div className="bg-linear-to-b from-black to-white/50 absolute z-0 w-full left-0 top-0 h-full"> 
                <span className="text-white flex my-3 mx-5 bg-ink w-35 text-[10px] items-center justify-center p-0.5 font-semibold border border-gray-600">
                    SELEÇÃO DO DIA
                </span>
            </div>
          </div>

          <div className="pt-29 px-5">
            <div className="flex items-center z-30 gap-2.5 ">
              <DialogModal filmChoose={filmChoose} save={save} saveButton={saveButton}>
                <div className="group relative w-36 shrink-0 overflow-hidden shadow-lg">
                  <img
                    className="w-full cursor-pointer object-cover border-2 border-gray-500 shadow-2xl shadow-gray-950"
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    crossOrigin="anonymous"
                    ref={imageRef}
                    alt={film.title}
                  />
                  <div className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-ink/90 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border border-gray-400 bg-ink px-3 py-1 font-sans text-white">
                      VER FICHA
                    </span>
                  </div>
                </div>
              </DialogModal>

              <div className="pt-5 z-20 min-w-0">
                  <DialogModal filmChoose={filmChoose} save={save} saveButton={saveButton}>
                    <h2 className={"font-medium text-2xl text-ink hover:text-accent cursor-pointer transition-all mt-4"}> {film.title} </h2>
                  </DialogModal>

                  {film.tagline !== "" && (
                    <p className="block max-w-full truncate text-[10px] italic">
                      "{film.tagline}"
                    </p>
                  )}
                  
                  <h3 className={"text-[12px] mt-2 text-gray-500 truncate"}> DIREÇÃO: <span className="text-ink font-bold">{director[0]?.name?.toUpperCase()}</span></h3>
              </div>
            </div>

            <div className="mt-5 flex bg-gray-100 border border-gray-300 items-center justify-between w-auto">
              <div className={"flex flex-col items-center gap-1 text-gray-400 bg-gray-100/70 border-neutral-300 border-r text-[12px] font-bold py-2 px-5 hover:bg-gray-200 transition-all"}>
                NOTA
                <span className="flex items-center gap-2">
                  <IoStarSharp className="text-yellow-300"/> <span className="font-bold text-ink">{film.vote_average.toFixed(1) }</span>  / 10
                </span>

              </div>

              <span className={"text-[9px] font-bold py-2 px-5 text-gray-400 flex flex-col items-center hover:bg-gray-200 transition-all"}>
                LANÇAMENTO
                <span className={"mt-2 text-ink text-[11px]"}>{date}</span>
              </span>

              <span className={"border-l border-gray-300 text-gray-400 text-[9px] flex flex-col py-2 px-5 hover:bg-gray-200 transition-all"}>
                DURAÇÃO
                <span className="mt-2 text-[11px] text-ink font-bold">{film.runtime} min</span>
              </span>

            </div>

            <div className={"my-4 flex gap-1 flex-wrap"}>
              {film.genres.map((genre) => {
                return (
                  <span key={genre.id} className={"text-[9px] font-bold text-ink border-gray-300 border bg-gray-100/40 mr-1 py-1 px-2 cursor-pointer"}>
                    {genre.name.toUpperCase()}
                  </span>
                );
              })}
            </div>

<span className={"h-2 block w-full border-neutral-300 border-b my-3"} />

          {film.overview === "" ? (
            <div className={"my-2 text-sm h-18"}>
              <p className={"text-gray-600"}>Esse filme não possui nenhuma sinopse</p>
            </div>
          ) : (
            <div className={"my-2 text-sm min-w-0"}>
              <p className={"text-gray-600 line-clamp-3"}>{film.overview}</p>
            </div>
          )}

          <span className={"h-2 block w-full border-neutral-300 border-b my-3"} />

          <div className={"flex min-w-0 items-center gap-1 text-[12px]"}>
            <h4>ELENCO:</h4>
            <p
              className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-400"
              title={actorInFilm.map((actor) => actor.name).join(", ")}
            >
              {actorInFilm.map((actor) => actor.name).join(", ")}
            </p>
          </div>

          <div className="mt-4 mb-1 w-full font-semibold">
            <DialogModal filmChoose={filmChoose}>
              <button className="bg-ink w-full p-2 text-white font-sans cursor-pointer hover:bg-ink/90 transition-all">
                VER FICHA TÉCNICA
              </button>
            </DialogModal>
          </div>

          <div className={"flex items-center gap-2 mt-1 w-full pb-6"}>
            <DialogModal isCard={false} filmChoose={filmChoose}>
              <button className={"bg-ink w-full flex items-center justify-center gap-1.5 px-6 py-3 text-white cursor-pointer font-bold font-sans transition-all hover:bg-ink-hover"}>
                <FaPlay />
                TRAILER
              </button>
            </DialogModal>

            <SalvFilmButton save={save} saveButton={saveButton} />
          </div>
          </div>
        </div>
      ) : (
        <div className={"mt-6 py-5 flex flex-wrap justify-center items-center flex-col gap-5 px-3"}>
          <span className={"bg-ink flex justify-center flex-wrap items-center h-15 w-15 border-accent border-2"}>
            <FaDice fontSize={35} className={"text-accent"} />
          </span>
          <h3 className={"italic text-2xl mt-3"}>Pronto para a Escolha Perfeita?</h3>
          <p className={"text-xs text-gray-700 font-sans font-medium w-80"}>
            Nenhum filme selecionado ainda. Ajuste seus filtros de gênero ou ator ao lado e clique no botão abaixo para girar a roleta.
          </p>

          <ButtonRollet start={start} loadingButton={loadingButton} />
        </div>
      )}
    </div>
  );
}