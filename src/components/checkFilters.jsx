import { api } from "../service/api";


export default async function checkFilters({response, chooseGenre, actor, i, actorInformation}) {
     if (chooseGenre === 0 && actor === "") {
              response = await api.get(`/discover/movie`, {
                params: {
                  language: "pt-BR",
                  page: i
                }
              });

              return response.data
            }
    
            if (chooseGenre === "" && actor !== "") {
              response = api.get(`/discover/movie`, {
                params: {
                  with_cast: actorInformation.id,
                  language: "pt-BR"
                }
              })

              return response.data
            }
    
    
            if (chooseGenre !== 0 && actor !== "") {
              response = await api.get(`/discover/movie`, {
                params: {
                  with_cast: actorInformation.id,
                  with_genres: chooseGenre,
                  language: "pt-BR"
                }
              })

              return response.data
              
            } else {
              response = await api.get(`/discover/movie`, {
                params: {
                  with_genres: chooseGenre,
                  language: "pt-BR"
                }
              })

              return response.data
            }
}