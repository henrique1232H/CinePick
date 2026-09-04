import { AlertDialog } from "radix-ui";
import FilmDetails from "./filmDetails";
import Trailer from "./trailer";
import { useState } from "react";

export default function DialogModal({children, filmChoose, save, saveButton, isCard = true, actorInformation = false}) {
	const [director, setDirector] = useState([]);
	const [actors, setActor] = useState([]);
	const [brazilProviders, setBrazilProviders] = useState([]);
	const [date, setDate] = useState("")

	let film
	let credits;
	let providers;
	
	if(actorInformation === true) {
		film = filmChoose.film;
		credits = filmChoose.credits;
		providers = filmChoose.providers;

		setActor(credits.cast.slice(0, 3));
		setDirector(credits.crew.find((person) => person.job === "Director"));
		setBrazilProviders(providers?.BR?.flatrate ?? []);
		setDate(new Date(film.release_date).getFullYear());
	}

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
			<AlertDialog.Overlay className="modal-overlay fixed z-50 inset-0 bg-black/70" />
			
			{
				isCard ? <FilmDetails date={date} film={film} actors={actors} director={director} save={save} saveButton={saveButton} brazilProviders={brazilProviders}/> : <Trailer props={filmChoose} date={date} actorInformation={actorInformation}  />
			}
			
		</AlertDialog.Portal>
        </AlertDialog.Root>
    )
} 