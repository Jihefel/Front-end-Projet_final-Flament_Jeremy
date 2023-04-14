import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FaSpaceShuttle } from "react-icons/fa";

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

// Import all images in subdirectories of ./public/assets/images/
importAll(
  require.context("../../public/assets/images", true, /\.(png|jpe?g|svg|webp)$/)
);

function GalleryHome(props) {
  return (
    <div className="gallery home">
      <Link href={"/etoiles"}>
        <div className="image-container relative">
          <figure className="relative">
            <Image
              src={images[`./soleil/sun.jpg`].default}
              alt="Soleil"
              priority
              className="img-hors-carousel"
            />
            <figcaption className="absolute text-white">Le Soleil</figcaption>
          </figure>
          <p className="direction-carousel absolute text-white top-1/2 left-1/2 -translate-x-1/2 z-10 opacity-0 duration-300">Vers le soleil</p>
        </div>
      </Link>
      <Carousel
        indicators={false}
        leftControl={<FaSpaceShuttle />}
        rightControl={<FaSpaceShuttle />}
      >
        {props.dataPlanetes.map((planete, index) => (
          <Link href={"/planetes"} key={index}>
            <div className="image-container">
              <figure>
                <Image
                  src={images[`./planetes/${planete.id}.jpg`].default}
                  alt={planete.id}
                  priority
                />
                <figcaption className="absolute text-white">
                  {planete.name}
                </figcaption>
              </figure>
              <p className="direction-carousel absolute text-white top-1/2 left-1/2 -translate-x-1/2 z-10 opacity-0 duration-300">Vers les planètes</p>
            </div>
          </Link>
        ))}
      </Carousel>
      <Carousel
        indicators={false}
        leftControl={<FaSpaceShuttle />}
        rightControl={<FaSpaceShuttle />}
        slideInterval={6000}
      >
        {props.dataPlanetesNaines.map((planeteNaine, index) => (
          <Link href={"/planetes-naines"} key={index}>
            <div className="image-container">
              <figure>
                <Image
                  src={
                    images[`./planetes-naines/${planeteNaine.id}.jpg`].default
                  }
                  alt={planeteNaine.id}
                  priority
                />
                <figcaption className="absolute text-white">
                  {planeteNaine.name}
                </figcaption>
              </figure>
              <p className="direction-carousel absolute text-white top-1/2 left-1/2 -translate-x-1/2 z-10 opacity-0 duration-300">Vers les planètes naines</p>
            </div>
          </Link>
        ))}
      </Carousel>
      <Link href={"/lunes"}>
        <div className="image-container relative">
          <figure className="relative">
            <Image
              src={images[`./lunes/terre/lune.jpg`].default}
              alt="Lune"
              priority
              className="img-hors-carousel"
            />
            <figcaption className="absolute text-white">La Lune</figcaption>
          </figure>
          <p className="direction-carousel absolute text-white top-1/2 left-1/2 -translate-x-1/2 z-10 opacity-0 duration-300">Vers les lunes</p>
        </div>
      </Link>
    </div>
  );
}

export default GalleryHome;
