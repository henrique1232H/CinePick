import { FaDice, FaPlay } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import DialogModal from "../DialogModal";
import ButtonRollet from "../ButtonRollet";
import SalvFilmButton from "../SalvFilmButton";

export default function Card({ isActive, filmChoose, start, loadingButton, save, saveButton }) {
  const film = filmChoose?.film;
  const credits = filmChoose?.credits;
  const actorInFilm = credits?.cast?.slice(0, 3);
  const director = credits?.crew?.filter((person) => person.job === "Director");
  const date = film ? new Date(film.release_date).getFullYear() : null;

  return (
    <div className={"bg-surface mx-3 my-4 p-5 px-9 flex-wrap rounded-lg border-neutral-300 border-b font-sans"}>
      {isActive ? (
        <div className={"flex py-5 justify-center items-center flex-col"}>
          <DialogModal filmChoose={filmChoose} save={save} saveButton={saveButton}>
            <div className="group relative">
              <img
                className={"cursor-pointer shadow-lg shadow-gray-200"}
                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                alt={film.title}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer">
                <span className="border border-gray-400 bg-ink px-3 py-1 font-sans text-white">
                  VER FICHA
                </span>
              </div>
            </div>
          </DialogModal>

          <div className={"flex items-center justify-center gap-4 my-3"}>
            <span className={"bg-ink text-white text-[9px] font-bold px-3 py-1"}>{date}</span>
            <span className={"flex items-center justify-center gap-1 text-accent bg-gray-100/70 border-neutral-300 border px-2 text-[12px] font-bold"}>
              <IoStarSharp /> {Math.round(film.vote_average)} / 10
            </span>
            <span className={"border-neutral-300 border text-gray-300 px-2 text-[12px]"}>{film.runtime} min</span>
          </div>

          <h2 className={"italic font-medium text-lg hover:text-accent"}> {film.title} </h2>
          <h3 className={"text-gray-300 font-semibold"}> {director[0]?.name?.toUpperCase()} - {date} </h3>

          <div className={"my-4 flex gap-1 flex-wrap items-center justify-center"}>
            {film.genres.map((genre) => {
              return (
                <span key={genre.id} className={"text-xs border-gray-300 border-2 mr-2 py-1 px-3"}>
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
            <div className={"my-2 text-sm h-18 overflow-y-scroll"}>
              <p className={"text-gray-600"}>{film.overview}</p>
            </div>
          )}

          <span className={"h-2 block w-full border-neutral-300 border-b my-3"} />

          <div className={"flex text-[12px] justify-center flex-wrap gap-1 items-center"}>
            <h4>Elenco:</h4>

            {actorInFilm.map((actor) => {
              return (
                <p key={actor.id} className={"text-gray-400"}>
                  {actor.name},
                </p>
              );
            })}
          </div>

          <div className="mt-4 mb-1 w-full font-semibold">
            <DialogModal filmChoose={filmChoose}>
              <button className="bg-ink w-full p-2 text-white font-sans cursor-pointer hover:bg-ink/90 transition-all">
                VER FICHA TÉCNICA
              </button>
            </DialogModal>
          </div>

          <div className={"flex items-center gap-2 mt-1 w-full"}>
            <DialogModal isCard={false} filmChoose={filmChoose}>
              <button className={"bg-ink w-full flex items-center justify-center gap-1.5 px-6 py-3 text-white cursor-pointer font-bold font-sans transition-all hover:bg-ink-hover"}>
                <FaPlay />
                TRAILER
              </button>
            </DialogModal>

            <SalvFilmButton save={save} saveButton={saveButton} />
          </div>
        </div>
      ) : (
        <div className={"mt-6 py-5 flex justify-center items-center flex-col gap-5"}>
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