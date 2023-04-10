import PreviewBody from "@/components/common/PreviewBody";
import { TextInput } from "flowbite-react";
import { Container } from "react-bootstrap";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/router";


function PlanetesIndex(props) {
  const dataPlanetes = props.dataPlanetes;

  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <section className="planetes py-5">
      <Container>
        <h1 className="titre-planetes">Les planètes</h1>
        <div className="mb-10 w-3/4 lg:w-1/3 mx-auto">
          <TextInput
            id="search-dwarf"
            placeholder="Rechercher une planète"
            addon="@"
            type="search"
          />
        </div>
        <div className="mx-auto max-w-2xl mt-4 lg:max-w-full w-full">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 sm:grid-cols-1 xl:gap-x-24 w-full">
            <PreviewBody
              dataTypeDeCorps={dataPlanetes}
              lienTypeDeCorps={"planetes"}
            ></PreviewBody>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PlanetesIndex;

export async function getStaticProps() {
  const responsePlanetes = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Planet`
  );
  const dataPlanetes = await responsePlanetes.json();

  return {
    props: { dataPlanetes },
  };
}
