import Loader from "@/components/common/Loader";
import { useRouter } from "next/router";
import PreviewBody from "@/components/common/PreviewBody";
import { TextInput, Accordion } from "flowbite-react";
import { Container } from "react-bootstrap";

function LunesIndex(props) {
  const data = Object.values(props);

  const lunes = data.flatMap((corps, index) => (
    corps.bodies.map(lune => 
      lune.aroundPlanet.planet)
  ))

  console.log(lunes)

  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }





  //TODO - Gallerie comme Home mais vertical avec l'image de la planete avec ses lunes plutot, pour avoir un page intermédiaire



  return (
    <section className="planetes py-5">
      <Container>
        <h1 className="titre-planetes-naines">Les lunes</h1>
        <Accordion collapseAll={true} alwaysOpen={true}>
          {data.map((corps, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                {lunes[index].at(0).toUpperCase() +
                  lunes[index].substring(1)}
              </Accordion.Title>
              <Accordion.Content>
                <div className="mx-auto max-w-2xl lg:max-w-full w-full">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 sm:grid-cols-1 xl:gap-x-24 w-full">
                    <PreviewBody
                      dataTypeDeCorps={corps}
                      lienTypeDeCorps={"lunes/" + lunes[index]}
                    ></PreviewBody>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </Container>
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

  //   // Ajouter Cérès à la liste des planètes naines
  //   const dataPlanetesNaines = { bodies: dwarfBodies.bodies.concat(ceres) };

  return {
    props: { lune, mars },
  };
}
