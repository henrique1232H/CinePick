import { useEffect, useState } from 'react'
import { api } from '../service/api'
import Header from '../components/Header'
import authenticantion from '../service/authenticantion'
import SortFilms from '../components/SortFilms'
import { checkFilters } from '../components/checkFilters'
import { FaDice, FaRegSave } from 'react-icons/fa'
import ListFilm from '../components/ListFilms'

export default function App() {

  const [runRollet, setRunRollet] = useState(false)
  const [filmChoose, setFilmChoose] = useState(null)
  const [genres, setGenres] = useState([])
  const [chooseGenre, setChooseGenre] = useState("");
  const [actor, setActor] = useState("");
  const [actorInformation, setActorInformation] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [changePage, setChangePage] = useState(false);

  const [saveFilm, setSaveFilm] = useState(false);
  const [listFilmsSave, setListFilmsSave] = useState([])

    const searchFilm = async () => {
      setSaveFilm(false)
      setLoadingButton(true)
      let filmsToRandom = []
      let response;

      console.log(actor)
      console.log(actorInformation)

      if(actorInformation.length === 0) {
        alert("Por favor digite um ator valido")
        setLoadingButton(false)
        return
      }

      const checkIfFilmIsAlreadySave = listFilmsSave.filter((filmsSave) => filmsSave.filmChoose.id === filmChoose.film.id);
      if(checkIfFilmIsAlreadySave.length === 1) {
        setSaveFilm(true)
      }

      try {
        for(let i = 1; i <= 3; i++) {
          response = await checkFilters(chooseGenre, i, actorInformation[0]);          
          response.results.forEach(filmInArray => {
            filmsToRandom = [...filmsToRandom, filmInArray];
          })

        }
              
        const random = Math.floor(Math.random() * (filmsToRandom.length - 0) + 0);

        const filmCorrect = await api.get(`/movie/${filmsToRandom[random].id}`, {
          params: {
            language: "pt-BR"
          }
        });

        let trailerForFilm = await api.get(`/movie/${filmCorrect.data.id}/videos`);

        trailerForFilm = trailerForFilm.data.results.filter((e) => e.type === "Trailer")[0];

        const providersToFilm = await api.get(`/movie/${filmCorrect.data.id}/watch/providers`, {
          params: {
            language: "pt-BR"
          }
        });
        const credits = await api.get(`/movie/${filmCorrect.data.id}/credits`, {
          params: {
            language: "pt-BR"
          }
        });

        const film = {
          film: filmCorrect.data,
          trailer: trailerForFilm,
          providers: providersToFilm.data.results,
          credits: credits.data,
        }
        
        setFilmChoose(film)
        setRunRollet(true)
      } catch (err) {
        console.log(err)
      } finally {
        setLoadingButton(false)
      }
    }
    
    useEffect(() => {

    const checkMovieList = async () => {
      const response = await api.get("/genre/movie/list", {
        params: {
          language: "pt-BR"
        }
      });
      setGenres(response.data.genres)
    }

    checkMovieList()
      
    const checkAuthentication = async () => {

    try {
      const returnAuth = await authenticantion();
      return returnAuth.data
    } catch (err) {
      alert(err);
    }

    }
    checkAuthentication()
  },[])

  useEffect(() => {

     const searchActor = async () => {
     let checkOnlyActor = [];
      try {
        setLoading(true)
        const response = await api.get(`/search/person?query=${actor}`, {
          params: {
            language: "pt-BR"
          }
        });
        
        if(response.data.results.length !== 0) {
          checkOnlyActor = response.data.results.filter((e) => e.known_for_department === "Acting");
        }
                
      } catch (err) {
        console.log(err)
      } finally {



        setLoading(false)
        setActorInformation(checkOnlyActor)
      }
     }

     searchActor()
  }, [actor])

  return (
    <>
      <Header />

      <main className={"px-2 mx-4 my-20"}>

        {
          !changePage ? (
            <SortFilms
              filmChoose={filmChoose}
              runRollet={runRollet}
              searchFilm={searchFilm}
              loadingButton={loadingButton}
              genres={genres}
              setChooseGenre={setChooseGenre}
              actor={actor}
              clear={() => setActor("")}
              change={(e) => setActor(e.target.value)}
              actorInformation={actorInformation}
              loading={loading}
              saveButton={saveFilm}
              save={() => {
                if(saveFilm === false){

                  const year = new Date().getFullYear();
                  const month = new Date().getMonth();
                  const day = new Date().getDate();
                  const date = `${day}/${month}/${year}`


                  const film = {filmChoose, date, status: "todos"}

                  setListFilmsSave((prevent) => [...prevent, film])
                  setSaveFilm(true)
                } else {
                  const removeFilm = listFilmsSave.filter((filmToRemove) => filmToRemove.filmChoose.film.id !== filmChoose.film.id)
                  setListFilmsSave(removeFilm)
                  setSaveFilm(false)
                }
              }}
    
            />
          ): <ListFilm listForFilms={listFilmsSave} setListForFilm={setListFilmsSave}/>
        }
      </main>

      <div className={"fixed bottom-0 w-full p-3 bg-white border-t-gray-200 border-t"}> 
        <div className={"flex justify-around gap-3 items-center font-sans font-semibold"}>
          <button className={`flex items-center flex-col transition-all ${!changePage ? "text-accent" : "text-gray-300 hover:text-ink-hover"}  cursor-pointer`} onClick={() => {
            setChangePage(false)
          }}>
            <FaDice fontSize={"#fff"}/>
            SORTEIO
          </button>

          <button className={`flex items-center transition-all ${changePage ? "text-accent" : "text-gray-300 hover:text-ink-hover"} flex-col cursor-pointer `} onClick={() => {
            setChangePage(true)
          }}>
            <FaRegSave/>
            SALVOS
          </button>
        </div>
      </div>

    
    </>
  )
}

