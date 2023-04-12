/* eslint-disable react/no-unescaped-entities */
import GalleryHome from "@/components/GalleryHome";
import Loader from "@/components/common/Loader";
import Head from "next/head";
import { useRouter } from "next/router";

function Home(props) {

  const router = useRouter();
  
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Exo Next</title>
      </Head>
     
      <GalleryHome dataPlanetes={props.dataPlanetes.bodies} dataPlanetesNaines={props.dataPlanetesNaines.bodies} />
      
    </>
  );
}

export async function getStaticProps() {

  const responsePlanetes = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Planet`
  );
  const dataPlanetes = await responsePlanetes.json();

  // Obtenir les données de tous les corps de type "Dwarf"
  const responseDwarfBodies = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,sw,Dwarf`
  );
  const dwarfBodies = await responseDwarfBodies.json();

  // Obtenir les données de Cérès séparément
  const responseCeres = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/ceres"
  );
  const ceres = await responseCeres.json();

  // Ajouter Cérès à la liste des planètes naines
  const dataPlanetesNaines = { bodies: [...dwarfBodies.bodies, ceres] };
  
  return {
    props: { dataPlanetes, dataPlanetesNaines },
  };
}



export default Home;
