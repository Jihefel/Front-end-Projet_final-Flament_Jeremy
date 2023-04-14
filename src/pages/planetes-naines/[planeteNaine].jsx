import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Row, Container } from "react-bootstrap";
import CardNft from "@/components/CardNft";
import { Breadcrumb } from "flowbite-react";
import { GiAstronautHelmet } from "react-icons/gi";
import Head from "next/head";

function PlanetesNaines(props) {
  const router = useRouter();
  const data = props.planeteNaineActuelle;

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
        <title>{router.query.planeteNaine}</title>
      </Head>
      <section className="section-planetes">
        <Container>
          <Breadcrumb aria-label="Default breadcrumb example">
            {breadcrumbItems}
          </Breadcrumb>
          <h1 className="titre-planetes-naines titre">{data.name}</h1>
          <Row>
            <Col lg={4}>
              <CardNft data={data} dataEth={props.dataEth} rarity="nain" />
            </Col>
            <Col lg={8} className="text-white ps-5">
              <Row>
                <Col lg={6}>
                  <div className="text-2xl leading-10">
                    <dl className="mb-4">
                      <dt>Nom en anglais : </dt>
                      <dd>{data.englishName}</dd>
                    </dl>
                    {data.alternativeName === "" ? undefined : (
                      <dl className="mb-4">
                        <dt>Nom alternatif : </dt>
                        <dd>{data.alternativeName}</dd>
                      </dl>
                    )}
                    <dl className="mb-4">
                      <dt>Découverte par : </dt>
                      <dd>
                        {data.discoveredBy} <i>le</i> {data.discoveryDate}
                      </dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Masse : </dt>
                      <dd>
                        {data.mass.massValue} &times; 10
                        <sup>{data.mass.massExponent}</sup> &#x338F;
                      </dd>
                    </dl>
                    {data.meanRadius === 0 ? (
                      <dl className="mb-4">
                        <dt>Dimensions : </dt>
                        <dd>{data.dimension} &#x339E;</dd>
                      </dl>
                    ) : (
                      <dl className="mb-4">
                        <dt>Rayon moyen : </dt>
                        <dd>
                          {data.meanRadius.toLocaleString("fr-BE")} &#x339E;
                        </dd>
                      </dl>
                    )}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="text-2xl leading-10">
                    <dl className="mb-4">
                      <dt>Gravité de surface : </dt>
                      <dd>{data.gravity} &#x33A8;</dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Aphélie : </dt>
                      <dd>{data.aphelion.toLocaleString("fr-BE")} &#x339E;</dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Périhélie : </dt>
                      <dd>
                        {data.perihelion.toLocaleString("fr-BE")} &#x339E;
                      </dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Température moyenne : </dt>
                      <dd>
                        {data.avgTemp} &#x212A;{" "}
                        <span className="text-gray-500">=</span>{" "}
                        {(data.avgTemp - 273.15).toFixed(2)} &#x2103;
                      </dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Période de révolution :</dt>
                      <dd>{data.sideralOrbit.toLocaleString("fr-BE")} jours</dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Période de rotation :</dt>
                      <dd>
                        {data.sideralRotation.toLocaleString("fr-BE")} heures
                      </dd>
                    </dl>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default PlanetesNaines;

export async function getStaticProps(context) {
  const slug = context.params.planeteNaine;
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

  const planeteNaineActuelle = dataPlanetesNaines.bodies.find(
    (body) => body.id.toLowerCase() === slug
  );

  // Si pas de planete valide envoyée en url
  if (!planeteNaineActuelle) {
    return { notFound: true };
  }

  // Récupérer le prix de l'ETH
  const amount = 1;
  const convert = "EUR";
  const symbol = "ETH";

  const responseEth = await fetch(
    `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${amount}&convert=${convert}&symbol=${symbol}`,
    {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": "b8e32f51-9693-4075-8e5d-edad74ac4ac5",
        "Content-Type": "application/json",
      },
    }
  );

  const dataEth = await responseEth.json();

  return {
    props: { planeteNaineActuelle, dataEth },
  };
}

export async function getStaticPaths() {
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

  const paths = dataPlanetesNaines.bodies.map((body) => ({
    params: { planeteNaine: body.id },
  }));

  return {
    // paths: [{params : {corps: "la Terre"}}],
    // fallback: true,
    paths,
    fallback: false,
  };
}
