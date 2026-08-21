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
  const [filmChoose, setFilmChoose] = useState([])
  const [creditsForFilm, setCreditsForFilm] = useState([])
  const [genres, setGenres] = useState([])
  const [chooseGenre, setChooseGenre] = useState("");
  const [actor, setActor] = useState("");
  const [actorInformation, setActorInformation] = useState([])
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [changePage, setChangePage] = useState(false);

  const [saveFilm, setSaveFilm] = useState(false);
  const [listFilmsSave, setListFilmsSave] = useState([])

    const searchFilm = async () => {
      setLoadingButton(true)
      let filmsToRandom = []
      let response;


      try {
        for(let i = 1; i <= 5; i++) {
          response = await checkFilters(chooseGenre, actor, i, actorInformation);
          
          response.results.forEach(filmInArray => {
            filmsToRandom = [...filmsToRandom, filmInArray];
          })
          i++
        }
              
        const random = Math.floor(Math.random() * (filmsToRandom.length - 0) + 0);

        const filmCorrect = await api.get(`/movie/${filmsToRandom[random].id}`, {
          params: {
            language: "pt-BR"
          }
        });

        let trailerForFilm = await api.get(`/movie/${filmCorrect.data.id}/videos`, {
          params: {
            language: "pt-BR"
          }
        });

        trailerForFilm = trailerForFilm.data.results.filter((e) => e.type === "Trailer");

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

        
        setTrailer(trailerForFilm)
        setProviders(providersToFilm.data.results["BR"]["flatrate"]);
        setFilmChoose(filmCorrect.data)
        setCreditsForFilm(credits.data)
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
     let checkOnlyActor;
      try {
        setLoading(true)
        const response = await api.get(`/search/person?query=${actor}`, {
          params: {
            language: "pt-BR"
          }
        });

        checkOnlyActor = response.data.results.filter((e) => e.known_for_department === "Acting");
        
      } catch (err) {
        console.log(err)
      } finally {

        setLoading(false)
        setActorInformation(checkOnlyActor[0])
      }
     }

     searchActor()
  }, [actor])

  console.log(saveFilm)

  return (
    <>
      <Header />

      <main className={"px-2 mx-4 my-20"}>

        {
          !changePage ? (
            <SortFilms
              runRollet={runRollet}
              filmChoose={filmChoose}
              searchFilm={searchFilm}
              creditsForFilm={creditsForFilm}
              providers={providers}
              trailer={trailer}
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
                  setListFilmsSave((prevent) => [...prevent, filmChoose])
                  setSaveFilm(true)
                } else {
                  const removeFilm = listFilmsSave.filter((e) => e.id !== filmChoose.id)
                  setListFilmsSave(removeFilm)
                  setSaveFilm(false)
                }
              }}
    
            />
          ): <ListFilm listForFilms={listFilmsSave}/>
        }
      </main>

      <div className={"fixed bottom-0 w-full p-5 bg-white border-t-gray-200 border-t"}> 
        <div className={"flex justify-around gap-3 items-center font-sans font-semibold"}>
          <button className={`flex items-center flex-col transition-all hover:${!changePage ? "text-accent" : "text-ink-hover"} cursor-pointer ${!changePage ? "text-accent" : "text-gray-300"}`} onClick={() => {
            setChangePage(false)
          }}>
            <FaDice fontSize={"#fff"}/>
            SORTEIO
          </button>

          <button className={`flex items-center transition-all hover:${changePage ? "text-accent" : "text-ink-hover"} flex-col cursor-pointer ${changePage ? "text-accent" : "text-gray-300"}`} onClick={() => {
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

