

export default function SalvFilmCard({props}) {
    console.log(props)

    return (
        <div className="flex items-center bg-white p-2 mt-4 border border-gray-300 gap-3 hover:border-ink-hover transition-all">
            <div>
                <img src={`https://image.tmdb.org/t/p/w200${props.poster_path}`} alt={props.title} className={"h-40 border border-gray-300"}/>
            </div>

            <div>
                
                <h4>{props.title}</h4>

            </div>

        </div>
    )
}