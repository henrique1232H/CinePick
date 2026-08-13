import { useEffect, useState } from 'react'
import { api } from '../service/api'
import Header from '../components/Header'
import authenticantion from '../service/authenticantion'
import Card from '../components/Card'
import { IoIosFunnel } from 'react-icons/io'
import SelectInput from '../components/SelectInput'
import { FaRegUser } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { Ring } from 'ldrs/react'

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
        if (chooseGenre === 0) {
          response = await api.get(`/discover/movie?language=pt-BR&page=${i}`);
        } else {
          response = await api.get(`/discover/movie?language=pt-BR&with_genres=${chooseGenre}`)
        }

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

  useEffect(() => {

     const searchActor = async () => {
     let response;
      try {
        setLoading(true)
        response = await api.get(`/search/person?query=${actor}`);
        console.log(response.data)

      } catch (err) {
        console.log(err)
      } finally {
        console.log(response.data)
        setLoading(false)
        setActorInformation(response.data.results[0])
      }
     }

     searchActor()
  }, [actor])

  console.log(actorInformation === undefined)

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
              <div className={"bg-ink p-3 my-5 border-l-4 border-accent"}>
                <div className={"flex justify-between items-center"}>
                  <h4 className={"flex text-[10px] text-accent font-bold gap-2"}>
                   <MdDone fontSize={15} className={"text-green-400"}/>
                   ATOR CONFIRMADO PARA A ROLETA 
                  </h4>

                  <span className={"text-[8px] bg-accent/20 border-accent/30 border-1 text-accent p-2"}>FILTRO ATIVO</span>
                </div>

                {
                  loading ? (
                    <span className={"flex items-center text-white gap-1"}>
                      <Ring size="30" color="#2887FF"/>
                      <p className={"text-[10px]"}>Verificando dados de {actor} </p>
                    </span>
                  ) : actorInformation === undefined ? (
                    <div className={"flex items-center gap-2"}>
                      <img className={"h-11 w-9"} src={""} alt="" />
                      
                    </div>
                  ) : (
                    <div className={"flex items-center gap-2"}>
                      <img className={"h-11 w-9"} src={`https://image.tmdb.org/t/p/w200${actorInformation.profile_path}`} alt={`Foto do ${actorInformation.original_name}`} />

                      <span>
                        <h4 className={"text-white"}> {actorInformation.original_name} </h4>
                      </span>

                    </div>
                  )
                }

              </div>

            )
          }
        </div>


      </div>
      </main>

    
    </>
  )
}

