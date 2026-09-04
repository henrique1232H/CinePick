import { Ring } from "ldrs/react";
import { IoStarSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import DialogModal from "../DialogModal";

export default function ActorCard({actorInformation, loading, actor}) {

    const checkKnownFor = () => {

        if (loading === false) {
          if(actorInformation === undefined) {
            return "Verificando ator/atriz"
          }
            if (actorInformation?.known_for === undefined) {
                return "Não tem um trabalho registrado"
            } else if (actorInformation.known_for[0].title === undefined) {
                return actorInformation.known_for[0].name
            } else {
                return `${actorInformation.known_for[0].title} (${actorInformation.known_for[0].original_title})`
            }

          }
    }

    const check = checkKnownFor()
    return (
            <div className={"bg-ink p-3 my-5 border-l-4 border-accent"}>
                <div className={"flex justify-between items-center"}>
                  <h4 className={"flex text-[10px] text-accent font-bold gap-2"}>
                   <MdDone fontSize={15} className={"text-green-400"}/>
                   ATOR CONFIRMADO PARA A ROLETA 
                  </h4>

                  <span className={"text-[8px] bg-accent/20 border-accent/30 border text-accent p-2"}>FILTRO ATIVO</span>
                </div>

                {
                  loading ? (
                    <span className={"flex items-center text-white gap-1"}>
                      <Ring size="30" color="#2887FF"/>
                      <p className={"text-[10px]"}>Verificando dados de {actor} </p>
                    </span>
                  ) : actorInformation === undefined || actorInformation.length === 0 ? (
                    <div className={"flex items-center gap-2 text-white"}>
                      <img className={"h-11 w-9"} src={""} alt="" />
                      <p className={"text-[10px]"}> Não achamos esse ator/atriz...</p>
                      
                    </div>
                  ) : (
                    <div className={"flex items-center gap-2 hover:bg-ink-hover transition-all cursor-pointer"}>
                      <img className={"h-full w-10"} src={`https://image.tmdb.org/t/p/w200${actorInformation.profile_path}`} alt={`Foto do ${actorInformation.original_name}`} />

                      <DialogModal isCard={false} actorInformation={actorInformation}>
                        <span>
                          <h4 className={"text-white italic font-medium font-serif"}> {actorInformation.original_name} <span className={" ml-2 bg-accent/30 text-[10px] text-accent font-semibold font-sans px-1 border border-accent/50"}> VER BIO </span> </h4>
                          <p className={"flex items-center text-[9px] gap-2 text-white/80"}>
                            <IoStarSharp fontSize={13} className={""}/>
                            Destaque:
                            <span className={"text-accent"}>{check}</span>
                          </p>
                        </span>
                      </DialogModal>

                    </div>
                  )
                }
            </div>
    )
}