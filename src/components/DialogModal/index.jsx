import { AlertDialog } from "radix-ui";
import FilmDetails from "./filmDetails";
import TrailerOrActor from "./trailerOrActor";

export default function DialogModal({
	children,
	filmChoose,
	save,
	saveButton,
	isCard = true,
	actorInformation = false,
}) {
	const film = filmChoose?.film;
	const credits = filmChoose?.credits;
	const providers = filmChoose?.providers;

	const actors = credits?.cast?.slice(0, 3) ?? [];
	const director = credits?.crew?.find((person) => person.job === "Director") ?? null;
	const brazilProviders = providers?.BR?.flatrate ?? [];
	const date = film?.release_date
		? new Date(film.release_date).getFullYear()
		: "";

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
			<AlertDialog.Overlay className="modal-overlay fixed z-50 inset-0 bg-black/70" />
			
			{isCard ? (
				<FilmDetails
					date={date}
					film={film}
					actors={actors}
					director={director}
					save={save}
					saveButton={saveButton}
					brazilProviders={brazilProviders}
				/>
			) : (
				<TrailerOrActor
					props={filmChoose}
					date={date}
					actorInformation={actorInformation}
				/>
			)}
			
		</AlertDialog.Portal>
        </AlertDialog.Root>
    )
} 