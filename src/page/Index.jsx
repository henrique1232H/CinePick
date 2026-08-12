import { useEffect, useState } from 'react'
import { api } from '../service/api'
import Header from '../components/Header'
import authenticantion from '../service/authenticantion'
import Card from '../components/Card'
import { IoIosFunnel } from 'react-icons/io'
import SelectInput from '../components/SelectInput'
export default function App() {

  const [runRollet, setRunRollet] = useState(false)
  const [filmChoose, setFilmChoose] = useState([])
  const [creditsForFilm, setCreditsForFilm] = useState([])
  const [genres, setGenres] = useState([])

    const searchFilm = async () => {
      let filmsToRandom = []

      for(let i = 1; i <= 5; i++) {
        const response = await api.get(`/movie/popular?language=pt-BR&page=${i}`)
        response.data.results.forEach(filmInArray => {
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
          <h4 className={"text-[12px] text-gray-400 mb-2"}>GÊNERO</h4>
          <SelectInput genres={genres}/>

        </div>


      </div>
      </main>

    
    </>
  )
}

