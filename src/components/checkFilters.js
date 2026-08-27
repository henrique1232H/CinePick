/* eslint-disable no-useless-assignment */
import { api } from "../service/api";


export const checkFilters = async (chooseGenre, i, actorInformation) =>  {
  const data = new Date();
  const formattedDate = data.toISOString().slice(0, 10);
  let response;

  if (chooseGenre === "" && actorInformation === undefined) {
      response = await api.get(`/discover/movie`, {
        params: {
          language: "pt-BR",
          page: i,
          region: "BR",
          watch_region: "BR",
          with_watch_monezation_types: "flatrate",
          with_release_type: "3|4",
          "release_date.lte": formattedDate,
        }
      });
    }
    
    if (chooseGenre === "" && actorInformation !== undefined) {
      response = await api.get(`/discover/movie`, {
        params: {
          with_cast: actorInformation.id,
          language: "pt-BR",
          region: "BR",
          with_release_type: "3|4",
          "release_date.lte": formattedDate,
          watch_region: "BR",
          with_watch_monezation_types: "flatrate|rent",
          page: i
        }
      })
  }

  if (chooseGenre !== "" && actorInformation !== undefined) {
    response = await api.get(`/discover/movie`, {
      params: {
        with_cast: actorInformation.id,
        with_genres: chooseGenre,
        language: "pt-BR",
        region: "BR",
        with_release_type: "3|4",
        watch_region: "BR",
        with_watch_monezation_types: "flatrate",
        "release_date.lte": formattedDate,
        page: i,

      }
    }
  )    
  }

  if(chooseGenre !== "" && actorInformation === undefined) {
    response = await api.get(`/discover/movie`, {
      params: {
        with_genres: chooseGenre,
        language: "pt-BR",
        with_release_type: "3|4",
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