import Loader from "@/components/common/Loader";
import { useRouter } from "next/router";
import PreviewBody from "@/components/common/PreviewBody";
import { TextInput } from "flowbite-react";
import { Container } from "react-bootstrap";

function PlanetesNainesIndex(props) {
  const dataPlanetesNaines = props.dataPlanetesNaines;

  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <section className="planetes py-5">
      <Container>
        <h1 className="titre-planetes-naines">Les planètes naines</h1>
        <div className="mb-10 w-3/4 lg:w-1/3 mx-auto">
          <TextInput
            id="search-dwarf"
            placeholder="Rechercher une planète naine"
            addon="@"
            type="search"
          />
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-full w-full">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 sm:grid-cols-1 xl:gap-x-24 w-full">
            <PreviewBody
              dataTypeDeCorps={dataPlanetesNaines}
              lienTypeDeCorps={"planetes-naines"}
            ></PreviewBody>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PlanetesNainesIndex;

export async function getStaticProps() {
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
  const dataPlanetesNaines = { bodies: dwarfBodies.bodies.concat(ceres) };

  return {
    props: { dataPlanetesNaines },
  };
}
