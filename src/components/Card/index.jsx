import { FaDice, FaPlay } from "react-icons/fa";
import DialogModal from "../DialogModal";
import ButtonRollet from "../ButtonRollet";
import SalvFilmButton from "../SalvFilmButton";
import FilmStats from "../FilmStats";


export default function Card({ isActive, filmChoose, start, loadingButton, save, saveButton, Ref }) {
  const film = filmChoose?.film;
  const credits = filmChoose?.credits;
  const actorInFilm = credits?.cast
  
  const director = credits?.crew?.filter((person) => person.job === "Director");
  const date = film ? new Date(film.release_date).getFullYear() : null;
  
  const colors = filmChoose?.colors?.[0]?.hexColors ?? [];
  const darkestColor = filmChoose?.colors?.[1]?.darkest ?? "";
  const lightestColor = filmChoose?.colors?.[1]?.lightest ?? "";

  return (
    <div
      className="flex-wrap rounded-lg bg-surface font-sans mt-4"
      style={{
        backgroundColor: colors[2] || undefined,
        backgroundImage:
          colors[0] && colors[1]
            ? `linear-gradient(40deg, ${colors[0]}, ${colors[2]})`
            : undefined,
        transition: "300ms ease-in"
      }}
    >
      {isActive ? (
        <div className={`relative`}>

          <div className="absolute top-0 w-full border-b border-gray-500" style={{borderTop: `4px solid ${colors[1]}`}}>
            <img src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} alt="" className="top-0 w-full h-45 left-0 object-cover"/>

            <div className="bg-linear-to-b from-black to-white/50 absolute z-0 w-full left-0 top-0 h-full"> 
                <span className="text-white flex my-3 mx-5 bg-ink w-35 text-[10px] items-center justify-center p-0.5 font-semibold " style={{border: `1px solid ${colors[1]}`}} >
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
                    style={{border: `2px solid ${colors[0]}`}}
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    crossOrigin="anonymous"
                    ref={Ref}
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
                    <h2 className="mt-4 cursor-pointer text-2xl font-medium text-(--title) transition-all hover:text-(--title-hover)" style={{ "--title": lightestColor || "#ffffff", "--title-hover": darkestColor || "#000000" }}> {film.title} </h2>
                  </DialogModal>

                  {film.tagline !== "" && (
                    <p className="block max-w-full truncate text-[10px] italic" style={{color: lightestColor}}>
                      "{film.tagline}"
                    </p>
                  )}
                  
                  <h3 className={"text-[12px] mt-2 text-(--title) truncate"} style={{"--title": lightestColor}} > DIREÇÃO: <span className="text-white font-bold">{director[0]?.name?.toUpperCase()}</span></h3>
              </div>
            </div>

            <FilmStats
              voteAverage={film.vote_average}
              date={date}
              runtime={film.runtime}
            />

            <div className={"my-4 flex gap-1 flex-wrap"}>
              {film.genres.map((genre) => {
                return (
                  <span key={genre.id} className={"text-[9px] font-bold border mr-1 py-1 px-2 cursor-pointer text-white"} style={{border: `1px solid  ${colors[3]}`}}>
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
              <p className={"text-white line-clamp-3"}>{film.overview}</p>
            </div>
          )}

          <span className={"h-2 block w-full border-neutral-300 border-b my-3"} />

          <div className={"flex min-w-0 items-center gap-1 text-[12px]"}>
            <h4>ELENCO:</h4>
            <p
              className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-white"
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
              <button className={"bg-red-100 w-full flex items-center border border-red-400 justify-center gap-1.5 px-6 py-3 text-red-800 cursor-pointer font-bold font-sans transition-all hover:bg-red-200"}>
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