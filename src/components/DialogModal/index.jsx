import { AlertDialog } from "radix-ui";


export default function DialogModal({children,props}) {

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
			<AlertDialog.Overlay class="fixed inset-0 bg-black" />
			<AlertDialog.Content class="fixed left-1/2 top-1/2 my-10 h-full w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white">
				<AlertDialog.Title class="bg-amber-300 w-full flex flex-col justify-center items-center relative">
                    <img class={"w-full rounded-b-lg"} src={`https://image.tmdb.org/t/p/w500${props.backdrop_path}`}/>
					
                    <img className={"absolute top-1/2"} src={`https://image.tmdb.org/t/p/w200${props.poster_path}`} alt="" />
				</AlertDialog.Title>
				<AlertDialog.Description class="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialog.Description>
				<div class="flex justify-end gap-[25px]">
					<AlertDialog.Cancel asChild>
						<button class="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none">
							Cancel
						</button>
					</AlertDialog.Cancel>
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