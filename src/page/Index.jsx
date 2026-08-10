import { useEffect, useState } from 'react'
import { api } from '../service/api'
import Header from '../components/Header'
import authenticantion from '../service/authenticantion'
import Card from '../components/Card'
export default function App() {

  const [runRollet, setRunRollet] = useState(false)
  const [filmChoose, setFilmChoose] = useState([])
  const [creditsForFilm, setCreditsForFilm] = useState([])

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

      <div class={"mt-10 m-3"}>
       <h2 class={"text-4xl text-ink italic"}>Sorteie o <span class={"text-accent"}>filme perfeito</span></h2>
       <p class={"text-xs text-gray-700 font-sans font-medium mt-3"}>Defina gênero ou autor de preferência e deixe nossa roleta escolher o filme ideal para a sua noite.</p>

       <Card isActive={runRollet} props={filmChoose} start={searchFilm} credits={creditsForFilm}/>
      </div>
    
    </>
  )
}

