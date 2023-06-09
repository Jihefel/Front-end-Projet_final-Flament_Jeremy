import PreviewBody from "@/components/PreviewBody";
import { Breadcrumb } from "flowbite-react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiAstronautHelmet } from "react-icons/gi";
import Head from "next/head";

function PlanetesLunes(props) {
  const router = useRouter();

  const lunes = Object.values(props.allMoonsBrut).flatMap((planeteParente) =>
    planeteParente.bodies.filter(
      (lune) => lune.aroundPlanet.planet === router.query.planetes
    )
  );

  const lunesFiltrees = lunes.flat();

  const segments = router.asPath.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = [
    // Ajouter un élément d'accueil au début du breadcrumb
    <Breadcrumb.Item key="home" icon={GiAstronautHelmet}>
      <Link href="/" className="text-white">
        Accueil
      </Link>
    </Breadcrumb.Item>,
    // Ajouter les éléments dynamiques en utilisant les segments du chemin d'URL
    ...segments.map((segment, index) => {
      const isLast = index === segments.length - 1;
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      return (
        <Breadcrumb.Item key={segment}>
          {isLast ? (
            segment.at(0).toUpperCase() + segment.substring(1)
          ) : (
            <Link href={href} className="text-white">
              {segment.at(0).toUpperCase() + segment.substring(1)}
            </Link>
          )}
        </Breadcrumb.Item>
      );
    }),
  ];

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Les lunes de{" "}
          {(router.query.planetes === "terre" ? "La " : "") +
            router.query.planetes.at(0).toUpperCase() +
            router.query.planetes.substring(1)}
        </title>
      </Head>
      <section className="planetes">
        <Container>
          <Breadcrumb aria-label="Default breadcrumb example">
            {breadcrumbItems}
          </Breadcrumb>
          <h1 className="titre-sec-lunes">
            Les lunes de{" "}
            {(router.query.planetes === "terre" ? "La " : "") +
              router.query.planetes.at(0).toUpperCase() +
              router.query.planetes.substring(1)}
          </h1>
          <div className="mx-auto max-w-2xl mt-4 lg:max-w-full w-full">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 sm:grid-cols-1 xl:gap-x-24 w-full">
              {lunesFiltrees.flatMap((lune, index) => (
                <PreviewBody
                  dataTypeDeCorps={[lune]}
                  lienTypeDeCorps={`lunes/${router.query.planetes}`}
                  key={index}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default PlanetesLunes;

export async function getMoons() {
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
  // Triton
  const responseTriton = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,triton"
  );
  const neptune = await responseTriton.json();
  //!SECTION -Lunes Neptune

  //SECTION - Lunes Pluton
  // Charon
  const responseCharon = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,charon"
  );
  const pluton = await responseCharon.json();
  //!SECTION - Lunes Pluton

  const planetesUniques = {
    lune,
    mars,
    jupiter,
    saturne,
    uranus,
    neptune,
    pluton,
  };
  return planetesUniques;
}

export async function getStaticProps(context) {
  const slug = context.params.planetes;
  const allMoonsBrut = await getMoons();
  const lunes = Object.values(allMoonsBrut).flatMap((planeteParente) =>
    planeteParente.bodies.map((lune) => lune)
  );

  const planetesUniques = [...new Set(lunes)];

  const planeteActuelle = planetesUniques.find(
    (planete) => planete.aroundPlanet.planet === slug
  );

  // Si pas de planete valide envoyée en url
  if (!planeteActuelle) {
    return { notFound: true };
  }

  return {
    props: { planeteActuelle, allMoonsBrut },
  };
}

export async function getStaticPaths() {
  const planetesUniques = [
    "terre",
    "mars",
    "jupiter",
    "saturne",
    "uranus",
    "neptune",
    "pluton",
  ];

  const paths = planetesUniques.map((planete) => ({
    params: { planetes: planete },
  }));

  return {
    // paths: [{params : {corps: "la Terre"}}],
    // fallback: true,
    paths,
    fallback: false,
  };
}
