import Link from "next/link";
import { getMoons } from "./[planetes]";
import { useRouter } from "next/router";
import { Col, Row, Container } from 'react-bootstrap';
import Image from "next/image";
import CardNft from "@/components/CardNft";




function Lunes(props) {
const router = useRouter()
const data = props.luneActuelle

let dateOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric"}

    return ( 
        <>
        <section className="py-5 section-lunes-details">
      <Container>
        <h1 className="titre-sec-lunes titre">{data.name}</h1>
        <Row>
          <Col sm={4}>
            {/* <Image src={
                    images[`./lunes/${data.aroundPlanet.planet}/${data.id}.jpg`] ||
                    images[`./lunes/${data.aroundPlanet.planet}/${data.id}.jpeg`] ||
                    images[`./lunes/${data.aroundPlanet.planet}/${data.id}.png`] ||
                    images[`./lunes/${data.aroundPlanet.planet}/${data.id}.svg`] ||
                    images[`./lunes/${data.aroundPlanet.planet}/${data.id}.webp`]
                  } 
                  alt="Soleil" className="img-soleil-details" 
            /> */}
            <CardNft data={data} dataEth={props.dataEth} rarity="lunaire" />
          </Col>
          <Col sm={8} className="text-white ps-5">
            <Row>
              <Col sm={6}>
                <div className="text-3xl leading-10">
                  <dl className="mb-4">
                    <dt>Nom en anglais : </dt>
                    <dd>{data.englishName}</dd>
                  </dl>
                  <dl className="mb-4">
                    <dt>Masse : </dt>
                    <dd>
                      {data.mass.massValue} &times; 10
                      <sup>{data.mass.massExponent}</sup> &#x338F;
                    </dd>
                  </dl>
                  <dl className="mb-4">
                    <dt>Découverte par : </dt>
                    <dd>
                      {data.discoveredBy} le {data.discoveryDate}
                    </dd>
                  </dl>
                  <dl className="mb-4">
                    <dt>Densité : </dt>
                    <dd>{data.density}.41 g/&#x33A4;</dd>
                  </dl>
                  <dl className="mb-4">
                    <dt>Gravité de surface : </dt>
                    <dd>274 &#x33A8;</dd>
                  </dl>
                </div>
              </Col>
              <Col sm={6}>
                  <div className="text-3xl leading-10">
                    <dl className="mb-4">
                      <dt>Rayon à l&apos;équateur : </dt>
                      <dd>{data.equaRadius.toLocaleString('fr-BE')} &#x339E;</dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Distance de la Terre : </dt>
                      <dd>{(149597870.7).toLocaleString("fr-BE")} &#x339E; &#x3D; 1 &#x3373;</dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Température de surface : </dt>
                      <dd>{(5772).toLocaleString("fr-BE")} &#x212A;</dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Température au centre : </dt>
                      <dd>{15.1} millions &#x212A;</dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Inclinaison de l&apos;axe sur le plan de l&apos;écliptique : </dt>
                      <dd>{data.axialTilt}&deg;</dd>
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

export default Lunes;


export async function getServerSideProps(context) {
  const allMoonsBrut = await getMoons();
  const lunes = Object.values(allMoonsBrut).flatMap((planeteParente) =>
    planeteParente.bodies.map((lune) => lune)
  );

  const luneActuelle = lunes.find(
    (lune) => lune.id === context.params.lunes[1]
  );

  if (!luneActuelle) {
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
    props: { luneActuelle, dataEth },
  };
}