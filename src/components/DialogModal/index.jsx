import { AlertDialog } from "radix-ui";
import FilmDetails from "./filmDetails";
import Trailer from "./trailer";

export default function DialogModal({children, filmChoose, save, saveButton, isCard = true}) {
	const { film, credits, providers} = filmChoose;
	const actors = credits.cast.slice(0, 3);
	const director = credits.crew.find((person) => person.job === "Director");
	const brazilProviders = providers?.BR?.flatrate ?? [];
	const date = new Date(film.release_date).getFullYear();

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
			<AlertDialog.Overlay className="modal-overlay fixed z-50 inset-0 bg-black/70" />
			
			{
				isCard ? <FilmDetails date={date} film={film} actors={actors} director={director} save={save} saveButton={saveButton} brazilProviders={brazilProviders}/> : <Trailer props={filmChoose} date={date} />
			}
			
		</AlertDialog.Portal>
        </AlertDialog.Root>
    )
} 