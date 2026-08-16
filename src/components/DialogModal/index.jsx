import { AlertDialog } from "radix-ui";


export default function DialogModal({children,props}) {

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
			<AlertDialog.Overlay class="fixed inset-0 bg-black/70" />
			<AlertDialog.Content class="fixed left-1/2 top-1/2 my-10 h-full w-full max-w-125 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white">
				<AlertDialog.Title class="w-full flex h-auto flex-col justify-center items-center relative">

					<AlertDialog.Action asChild>
						<button class="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none">
							Yes, delete account
						</button>
					</AlertDialog.Action>
                    <img class={"w-full rounded-b-lg z-0"} src={`https://image.tmdb.org/t/p/w500${props.backdrop_path}`}/>

					<span className="z-10 absolute w-full h-full bg-ink/70"/>
					
                    <img className={"absolute z-10 top-1/2 border"} src={`https://image.tmdb.org/t/p/w200${props.poster_path}`} alt="" />
				</AlertDialog.Title>
				<AlertDialog.Description class=" px-4 py-2 mb-5 mt-3.75 text-[15px] leading-normal text-mauve11">
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialog.Description>
				<div class="flex justify-end gap-6.75">
					<AlertDialog.Action asChild>
						<button class="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none">
							Yes, delete account
						</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
        </AlertDialog.Root>
    )
} 