import { CiBookmark } from "react-icons/ci";
import { MdOutlineDone } from "react-icons/md";

export default function SalvFilmButton({save, saveButton}) {

    return (
        <button onClick={save} className={`${!saveButton ? "bg-white hover:bg-gray-100" : "bg-accent text-white border-none"} font-sans  w-full cursor-pointer text-ink border border-gray-300 p-3 font-semibold transition-all hover:${!saveButton  ? "bg-gray-100" : "bg-accent"} flex items-center justify-center gap-2`}>
            
            {
            !saveButton ? <CiBookmark fontSize={20}/> :  <MdOutlineDone fontSize={20}/>
            }
            {
            !saveButton ?  "SALVAR" : "SALVO"
            }
        </button>
    )

}