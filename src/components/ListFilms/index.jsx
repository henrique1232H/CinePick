import { useMemo, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import SalvFilmCard from "../SalvFimCard";
import { FiFilm } from "react-icons/fi";

export default function ListFilm({ listForFilms, setListForFilm, save, saveButton }) {
  const [selectedFilter, setSelectedFilter] = useState("TODOS");
  const [noteFilm, setNoteFilm] = useState("");

  const watchedFilms = useMemo(
    () => listForFilms.filter((film) => film.status === true),
    [listForFilms],
  );

  const toWatchFilms = useMemo(
    () => listForFilms.filter((film) => film.status !== true),
    [listForFilms],
  );

  const filteredFilms = useMemo(() => {
    if (selectedFilter === "ASSISTIDOS") {
      return watchedFilms;
    }

    if (selectedFilter === "PARA ASSISTIR") {
      return toWatchFilms;
    }

    return listForFilms;
  }, [selectedFilter, listForFilms, watchedFilms, toWatchFilms]);

  const buttons = [
    { name: "TODOS", id: 0 },
    { name: "PARA ASSISTIR", id: 1 },
    { name: "ASSISTIDOS", id: 2 },
  ];

  return (
    <div>
      <div>
        <h2 className={"flex items-center gap-2 text-ink-hover text-2xl"}>
          <FaRegSave className={"text-accent"} />
          Minha Lista Editorial
        </h2>
        <p className={"font-sans text-[12px] text-gray-500 mt-1"}>
          Seus filmes salvos para assistir ({watchedFilms.length} de {listForFilms.length} assistidos).
        </p>
      </div>

      <div className={"flex my-3 p-1 gap-4 font-sans border border-gray-300 text-[12px] text-gray-500 font-semibold"}>
        {buttons.map((button) => {
          const count =
            button.name === "TODOS"
              ? listForFilms.length
              : button.name === "PARA ASSISTIR"
                ? toWatchFilms.length
                : watchedFilms.length;

          return (
            <button
              key={button.id}
              className={`${selectedFilter === button.name ? "bg-ink text-white" : "bg-none"} transition-all p-2 cursor-pointer`}
              onClick={() => setSelectedFilter(button.name)}
            >
              {button.name} ({count})
            </button>
          );
        })}
      </div>

      {filteredFilms.length !== 0 ? (
        <div className="border-gray-300 border-t pt-3 mt-5">
          {filteredFilms.map(({ filmChoose, date, status, note }) => (
            <SalvFilmCard
              key={filmChoose.film.id}
              noteCard={note}
              props={filmChoose}
              date={date}
              status={status}
              save={save}
              saveButton={saveButton}
              removeFilm={() => {
                const remove = listForFilms.filter(
                  (filmToRemove) => filmToRemove.filmChoose.film.id !== filmChoose.film.id,
                );
                setListForFilm(remove);
              }}
              addNote={() => {
                setListForFilm((currentFilms) =>
                  currentFilms.map((filmToEdit) =>
                    filmToEdit.filmChoose.film.id === filmChoose.film.id
                      ? { ...filmToEdit, note: noteFilm }
                      : filmToEdit,
                  ),
                );
                setNoteFilm("");
              }}
              markDone={() => {
                setListForFilm((currentFilms) =>
                  currentFilms.map((filmToEdit) =>
                    filmToEdit.filmChoose.film.id === filmChoose.film.id
                      ? { ...filmToEdit, status: !status }
                      : filmToEdit,
                  ),
                );
              }}
            >
              <input
                type="text"
                placeholder={noteFilm === "" ? "Adicione sua nota..." : note}
                className="border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 w-full focus:ring-blue-500"
                value={noteFilm}
                onChange={(e) => setNoteFilm(e.target.value)}
              />
            </SalvFilmCard>
          ))}
        </div>
      ) : (
        <div className={"flex items-center flex-col justify-center h-2/4 bg-white w-full border border-gray-300 mt-5 p-6 gap-3"}>
          <span className={"bg-ink p-3"}>
            <FiFilm className={"text-white text-4xl"} />
          </span>

          <h3 className={"text-[25px] text-ink"}>Nenhum Filme Salvo nesta categoria</h3>

          <p className={"text-gray-500 text-center text-[14px] font-sans"}>
            Navegue pela roleta avançada para sortear e salvar seus filmes favoritos na sua lista!
          </p>
        </div>
      )}
    </div>
  );
}