import { api } from "../../service/api"


export default function Card() {
    const searchFilm = async () => {
        const response = await api.get("/movie/popular?language=pt-BR&page=2")
       

        console.log(response.data)
    }
    
    searchFilm()

    return (
        <div>
            
        </div>
    )
}