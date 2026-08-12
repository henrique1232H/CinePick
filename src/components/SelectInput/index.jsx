import { Select } from "radix-ui";
import { IoIosArrowDown } from "react-icons/io";



export default function SelectInput({genres}) {
    return (
        <Select.Root>
            <Select.Trigger className={"inline-flex h-[35px] w-full items-center justify-between  gap-[5px] bg-gray-200 p-4 text-[13px] leading-none text-ink border-1 border-gray-100"} aria-label="Gêneros do filme"> 
              <Select.Value placeholder="Selecione o gênero"/>

              <Select.Icon>
                <IoIosArrowDown fontSize={20}/>
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
            <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">

            <Select.ScrollUpButton />

            
            <Select.Viewport className="p-[5px]">
             <Select.Group>
                <Select.Label>as</Select.Label>
                {genres.map((genre) => {
                    console.log(genre)
                    return <Select.Item value={genre.name} key={genre.id} >
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