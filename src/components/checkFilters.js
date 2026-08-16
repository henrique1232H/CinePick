/* eslint-disable no-useless-assignment */
import { api } from "../service/api";


export const checkFilters = async (chooseGenre, actor, i, actorInformation) =>  {

  let response;
  if (chooseGenre === 0 && actor === "") {
      response = await api.get(`/discover/movie`, {
        params: {
          language: "pt-BR",
          page: i
        }
      });


    }

  if (chooseGenre === "" && actor !== "") {
    response = api.get(`/discover/movie`, {
      params: {
        with_cast: actorInformation.id,
        language: "pt-BR"
      }
    })

  }


  if (chooseGenre !== 0 && actor !== "") {
    response = await api.get(`/discover/movie`, {
      params: {
        with_cast: actorInformation.id,
        with_genres: chooseGenre,
        language: "pt-BR"
      }
    }
  )
  
  console.log(response.data)
    
  } else {
    response = await api.get(`/discover/movie`, {
      params: {
        with_genres: chooseGenre,
        language: "pt-BR"
      }
    })

  }

  return response.data
}