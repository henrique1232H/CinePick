/* eslint-disable no-useless-assignment */
import { useEffect, useState } from 'react'
import { api } from '../service/api'
import Header from '../components/Header'
import authenticantion from '../service/authenticantion'
import Card from '../components/Card'
import { IoIosFunnel } from 'react-icons/io'
import SelectInput from '../components/SelectInput'
import { FaRegUser } from 'react-icons/fa'
import ActorCard from '../components/ActorCard'
import {checkFilters} from '../components/checkFilters'

export default function App() {

  const [runRollet, setRunRollet] = useState(false)
  const [filmChoose, setFilmChoose] = useState([])
  const [creditsForFilm, setCreditsForFilm] = useState([])
  const [genres, setGenres] = useState([])
  const [chooseGenre, setChooseGenre] = useState("");
  const [actor, setActor] = useState("");
  const [actorInformation, setActorInformation] = useState([])
  const [loading, setLoading] = useState(true);

    const searchFilm = async () => {
      let filmsToRandom = []
      let response;

      for(let i = 1; i <= 5; i++) {

        console.log(actorInformation)
        response = await checkFilters(chooseGenre, actor, i, actorInformation);
    
        response.results.forEach(filmInArray => {
          filmsToRandom = [...filmsToRandom, filmInArray];
        })
        i++
      }
      const random = Math.floor(Math.random() * (filmsToRandom.length - 0) + 0);

      const filmCorrect = await api.get(`/movie/${filmsToRandom[random].id}?language=pt-BR`)
      const credits = await api.get(`/movie/${filmsToRandom[random].id}/credits?language=pt-BR`);

      setFilmChoose(filmCorrect.data)
      setCreditsForFilm(credits.data)
      setRunRollet(true)
    }
    
    useEffect(() => {

    const checkMovieList = async () => {
      const response = await api.get("/genre/movie/list?language=pt-BR");
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
     let response;
      try {
        setLoading(true)
        response = await api.get(`/search/person?query=${actor}&language=pt-BR`);

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
        setActorInformation(response.data.results[0])
      }
     }

     searchActor()
  }, [actor])

  return (
    <>
      <Header />

      <main className={"px-2 mx-4 my-3"}>
      
      <div className={""}>
       <h2 className={"text-4xl text-ink italic"}>Sorteie o <span className={"text-accent"}>filme perfeito</span></h2>
       <p className={"text-xs text-gray-600 font-sans font-medium mt-3"}>Defina gênero ou autor de preferência e deixe nossa roleta escolher o filme ideal para a sua noite.</p>

       <Card isActive={runRollet} props={filmChoose} start={searchFilm} credits={creditsForFilm}/>
      </div>

      <div className={"bg-surface mx-3 my-4 p-5 rounded-lg border-neutral-300 border-b font-sans"}>
        <div className={"flex items-center gap-3 pb-3 border-b-1 border-b-gray-600"}>
          <IoIosFunnel fontSize={20} className={"text-accent"}/>
          <h3 className={"italic text-ink"}>Filtros de Escolha</h3>
        </div>

        <div className={"mt-5"}>
          <h4 className={"text-[12px] text-gray-600 font-bold mb-2"}>GÊNERO</h4>
          <SelectInput genres={genres} setGenres={setChooseGenre}/>
        </div>

        <div className={"my-5"}>

          <div className={"flex justify-between items-center"}>
            <h4 className={"flex items-center gap-1 mt-3 text-[12px] text-gray-600 font-bold mb-2"}>
              <FaRegUser fontSize={15} className={"text-accent"}/> ATOR OU ATRIZ
            </h4>

            {
              actor.length > 1 && <p className={"text-[10px] text-accent font-bold cursor-pointer hover:border-b-1"} onClick={() => setActor("")}>LIMPAR </p>
            }
          </div>
         <input type="text" className={"w-full p-3 bg-gray-100 border-gray-300 border-1"} value={actor} onChange={(e) => setActor(e.target.value)}/>
          {
            actor.length > 1 && (
              <ActorCard  actorInformation={actorInformation} loading={loading} actor={actor}/>
            )
          }
        </div>


      </div>
      </main>

    
    </>
  )
}

