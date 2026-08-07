import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: 'aplication/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWQ3M2Y5NzZjZTY2ZmRhMDVhZWZiMGM1OWJiYTFiNiIsIm5iZiI6MTcwNzA3NzE5OC42NDEsInN1YiI6IjY1YmZlZTRlOTAyMDEyMDE3Y2NkOTBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GzDHPNBKddaRlRIh7oALxjblPq0PrNz8B6i76Kj_fbY'
    }
})
