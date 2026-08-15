import { Select } from "radix-ui";
import { IoIosArrowDown } from "react-icons/io";



export default function SelectInput({genres, chooseGenres, setGenres}) {

    return (
        <Select.Root onValueChange={setGenres}>
            <Select.Trigger className={"inline-flex h-10 w-full items-center justify-between  gap-1 bg-gray-100 p-4 text-[13px] leading-none text-ink border-1 border-gray-300"} aria-label="Gêneros do filme"> 
              <Select.Value placeholder="Selecione o gênero"/>
              <Select.Icon>
                <IoIosArrowDown fontSize={15}/>
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
            <Select.Content className="rounded-md bg-gray-100 border-gray-300 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">

            <Select.ScrollUpButton />

            
            <Select.Viewport className="p-[5px]">
             <Select.Group className={""}>
                <Select.Item value={"0"} className={"my-1 p-1 font-sans text-[14px] outline-none hover:bg-accent hover:text-white"}>
                  <Select.ItemText>
                    Todos os Gêneros
                   </Select.ItemText>
                </Select.Item>
                {genres.map((genre) => {
                    return <Select.Item className={"my-1 p-1 font-sans text-[14px] outline-none hover:bg-accent hover:text-white"} value={genre.id} key={genre.id} >
                        <Select.ItemText>
                         {genre.name}
                        </Select.ItemText>
                    </Select.Item>
                })}
             </Select.Group>
            </Select.Viewport>

            </Select.Content>
            </Select.Portal>

        </Select.Root>
    )
}