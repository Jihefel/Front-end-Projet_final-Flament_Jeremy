/* eslint-disable react/no-unescaped-entities */
import Gallery from "@/components/Gallery";
import Head from "next/head";
import { useRouter } from "next/router";

function Home(props) {

  const router = useRouter();

  if (router.isFallback) {
    return <h1 className="text-white text-5xl">Chargement...</h1>;
  }
  
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Exo Next</title>
      </Head>
     
      <Gallery dataPlanetes={props.dataPlanetes.bodies} dataPlanetesNaines={props.dataPlanetesNaines.bodies} />
      
    </>
  );
}

export async function getStaticProps() {

  const responsePlanetes = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Planet`
  );
  const dataPlanetes = await responsePlanetes.json();

  const responsePlanetesNaines = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,sw,Dwarf`
  );

  const dataPlanetesNaines = await responsePlanetesNaines.json();

  return {
    props: { dataPlanetes, dataPlanetesNaines },
  };
}



export default Home;
