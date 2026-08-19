/* eslint-disable no-useless-assignment */
import { api } from "../service/api";


export const checkFilters = async (chooseGenre, actor, i, actorInformation) =>  {
  const data = new Date();
  const formattedDate = data.toISOString().slice(0, 10);

  console.log(i)

  let response;
  if (chooseGenre === 0 && actor === "") {
      response = await api.get(`/discover/movie`, {
        params: {
          language: "pt-BR",
          page: i,
          watch_region: "BR",
          region: "BR",
          with_watch_monezation_types: "flatrate",
          with_release_type: "4",
          "release_date.lte": formattedDate,
        }
      });
    }
    
    if (chooseGenre === "" && actor.length > 0) {
    response = api.get(`/discover/movie`, {
      params: {
        with_cast: actorInformation.id,
        language: "pt-BR",
        watch_region: "BR",
        region: "BR",
        with_release_type: "4",
        "release_date.lte": formattedDate,
        with_watch_monezation_types: "flatrate",
        page: i
      }
    })

  }


  if (chooseGenre !== 0 && actor !== "") {
    response = await api.get(`/discover/movie`, {
      params: {
        with_cast: actorInformation.id,
        with_genres: chooseGenre,
        language: "pt-BR",
        region: "BR",
        watch_region: "BR",
        with_release_type: "4",
        with_watch_monezation_types: "flatrate",
        "release_date.lte": formattedDate,
        page: i,

      }
    }
    
  )
    
  } else {
    response = await api.get(`/discover/movie`, {
      params: {
        with_genres: chooseGenre,
        language: "pt-BR",
        with_release_type: "4",
        region: "BR",
        "release_date.lte": formattedDate,
        watch_region: "BR",
        with_watch_monezation_types: "flatrate",
        page: i
      }
    })

  }
  
  return response.data
}