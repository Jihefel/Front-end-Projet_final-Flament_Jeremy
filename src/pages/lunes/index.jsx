import Loader from "@/components/common/Loader";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

// Import all images in subdirectories of ./public/assets/images/
importAll(
  require.context(
    "../../../public/assets/images",
    true,
    /\.(png|jpe?g|svg|webp)$/
  )
);

function LunesIndex(props) {
  const data = Object.values(props);

  const lunes = data.flatMap((planeteParente, index) =>
    planeteParente.bodies.map((lune) => lune.aroundPlanet.planet)
  );

  //NOTE - En JavaScript, set est une structure de données qui représente une collection d'éléments uniques. Cela signifie que chaque élément ne peut être présent qu'une seule fois dans le set. Le type de données des éléments stockés dans un set peut être n'importe quoi: chaînes de caractères, nombres, objets, etc.
  const planetesUniques = [...new Set(lunes)];

  const router = useRouter();

  return (
    <section className="planetes section-lunes">
      <Container>
        <h1 className="titre-sec-lunes titres">Les lunes</h1>
      </Container>
      <div className="gallery">
        {planetesUniques.map((planete, index) => (
          <Link href={router.pathname + "/" + planete} key={planete}>
            <div className="image-container relative">
              <figure>
                <Image
                  // src={images[`./planetes/lunes-${planete}.jpg`].default}
                  src={
                    images[`./lunes/${planete}/lunes-${planete}.jpg`] ||
                    images[`./lunes/${planete}/lunes-${planete}.jpeg`] ||
                    images[`./lunes/${planete}/lunes-${planete}.png`] ||
                    images[`./lunes/${planete}/lunes-${planete}.svg`] ||
                    images[`./lunes/${planete}/lunes-${planete}.webp`]
                  }
                  alt={planete}
                  priority
                />
                <figcaption className="absolute text-white">
                  Lune{planete === "terre" ? "" : "s"} de {(planete === "terre" ? "La " : "") + planete.at(0).toUpperCase() + planete.substring(1)}
                </figcaption>
              </figure>
              <p className="direction-carousel absolute text-white top-1/2 left-1/2 -translate-x-1/2 z-10 opacity-0 duration-300">
                Vers {(planete === "terre" ? "La " : "") + planete.at(0).toUpperCase() + planete.substring(1)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default LunesIndex;

export async function getStaticProps() {
  // Lune Terre
  const responseLune = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies?filter[]=aroundPlanet,eq,terre`
  );
  const lune = await responseLune.json();

  // Lunes Mars
  const responseMars = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=aroundPlanet,eq,mars"
  );
  const mars = await responseMars.json();

  //SECTION - Lunes Jupiter
  // Callisto
  const responseCallisto = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,callisto"
  );
  const callisto = await responseCallisto.json();

  // Europe
  const responseEurope = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/europe"
  );
  const europe = await responseEurope.json();

  // Ganymede
  const responseGanymede = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/ganymede"
  );
  const ganymede = await responseGanymede.json();

  // Io
  const responseIo = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/io"
  );
  const io = await responseIo.json();

  const jupiter = {
    bodies: [...callisto.bodies, europe, ganymede, io],
  };
  //!SECTION - Lunes Jupiter

  //SECTION - Lunes Saturne
  // Encelade
  const responseEncelade = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,encelade"
  );
  const encelade = await responseEncelade.json();

  // Titan
  const responseTitan = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/titan"
  );
  const titan = await responseTitan.json();

  const saturne = {
    bodies: [...encelade.bodies, titan],
  };
  //!SECTION - Lunes Saturne

  //SECTION - Lunes Uranus
  // Miranda
  const responseMiranda = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,miranda"
  );
  const miranda = await responseMiranda.json();

  // Oberon
  const responseOberon = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/oberon"
  );
  const oberon = await responseOberon.json();

  const uranus = {
    bodies: [...miranda.bodies, oberon],
  };
  //!SECTION - Lunes Uranus

  //SECTION - Lunes Neptune
  // Miranda
  const responseTriton = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,triton"
  );
  const neptune = await responseTriton.json();
  //!SECTION -Lunes Neptune

  //SECTION - Lunes Pluton
  // Miranda
  const responseCharon = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,charon"
  );
  const pluton = await responseCharon.json();
  //!SECTION -Lunes Pluton

  return {
    props: { lune, mars, jupiter, saturne, uranus, neptune, pluton },
  };
}
