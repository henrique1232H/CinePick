import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Card";

const Carousel = CarouselModule.default ?? CarouselModule;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

export default function CarouselFilm({ filmInCarousel, save, saveButton, start, loadingButton }) {
    if (filmInCarousel.length === 0) {
        return null;
    }

    return (
        <Carousel
            showDots={true}
            responsive={responsive}
            ssr={true}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="px-1"
        >
            {filmInCarousel.map((filmChoose) => (
                <Card
                    key={filmChoose.film.id}
                    filmChoose={filmChoose}
                    isActive={true}
                    save={save}
                    saveButton={saveButton}
                    start={start}
                    loadingButton={loadingButton}
                />
            ))}
        </Carousel>
    )
}