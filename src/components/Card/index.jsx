import { FaDice } from "react-icons/fa"
import { api } from "../../service/api"
import { useState } from "react"
import { IoStarSharp } from "react-icons/io5"


export default function Card({isActive, props, start, credits}) {
    console.log(credits)
    console.log(props)


    return (
        <div class={"bg-surface mx-3 my-4 p-3 rounded-lg border-neutral-300 border-b font-sans"}>
            {isActive ? (
                <div class={"flex py-5 justify-center items-center flex-col font-medium"}>
                  <img class={"cursor-pointer h-55"} src={`https://image.tmdb.org/t/p/w200${props.poster_path}`}/>

                  <div class={"flex items-center justify-center gap-4 my-3"}>
                    <span class={"bg-ink text-white text-sm px-2 py-1"}>{props.release_date[0]}{props.release_date[1]}{props.release_date[2]}{props.release_date[3]}</span>
                    <span class={"flex items-center justify-center gap-1 text-accent bg-neutral-200 border-neutral-300 rounded-lg border-2  py-1 px-2 text-sm "}> <IoStarSharp/> {Math.round(props.vote_average)} / 10 </span>
                    <span class={" border-neutral-300 border-2 text-gray-300 px-2"}>{props.runtime} min</span>
                  </div>

                  <h2 class={"italic text-lg"}> {props.title} </h2>
                  <h3 class={"text-gray-300"}> {(credits.crew[0].name).toUpperCase()} </h3>

                  <div class={"my-4 "}>
                    {
                      props.genres.map((genre) => {
                        return <span key={genre.id} class={"text-xs border-gray-300 border-2 mr-2 py-1 px-3"}> {(genre.name).toUpperCase()} </span>
                      })
                    }
                  </div>


                </div>
            ): (
                <div class={"mt-6 py-5 flex justify-center items-center flex-col gap-5"}>
                    <span class={"bg-ink flex justify-center items-center h-15 w-15 border-accent border-2"}>
                        <FaDice fontSize={35} class={"text-accent"}/>
                    </span>
                    <h3 class={"italic text-2xl mt-3"}>Pronto para a Escolha Perfeita?</h3>
                    <p class={"text-xs text-gray-700 font-sans font-medium w-80"}>Nenhum filme selecionado ainda. Ajuste seus filtros de gênero ou ator ao lado e clique no botão abaixo para girar a roleta.</p>

                    <button onClick={start} class={"bg-ink flex items-center justify-center gap-2 px-6 py-3 border-accent border-2 text-white font-sans font-semibold cursor-pointer"}>
                        <FaDice fontSize={20} class={"text-accent"}/>
                        GIRAR ROLETA AGORA
                    </button>
                </div>
            )}
        </div>
    )
}