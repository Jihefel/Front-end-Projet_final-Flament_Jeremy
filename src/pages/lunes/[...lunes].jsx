import Link from "next/link";
import { getMoons } from "./[planetes]";
import { useRouter } from "next/router";
import { Col, Row, Container } from "react-bootstrap";
import Image from "next/image";
import CardNft from "@/components/CardNft";

function Lunes(props) {
  const router = useRouter();
  const data = props.luneActuelle;

  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
                    {data.discoveredBy === "" ? undefined : (
                      <dl className="mb-4">
                        <dt>Découverte par : </dt>
                        <dd>
                          {data.discoveredBy} <i>le</i> {data.discoveryDate}
                        </dd>
                      </dl>
                    )}
                    <dl className="mb-4">
                      <dt>Masse : </dt>
                      <dd>
                        {data.mass.massValue} &times; 10
                        <sup>{data.mass.massExponent}</sup> &#x338F;
                      </dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Rayon moyen : </dt>
                      <dd>
                        {data.meanRadius.toLocaleString("fr-BE")} &#x339E;
                      </dd>
                    </dl>
                    <dl className="mb-4">
                      <dt>Gravité de surface : </dt>
                      <dd>{data.gravity} &#x33A8;</dd>
                    </dl>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="text-2xl leading-10">
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
                    {data.avgTemp === 0 ? undefined : (
                      <dl className="mb-4">
                        <dt>Température moyenne : </dt>
                        <dd>
                          {data.avgTemp} &#x212A;{" "}
                          <span className="text-gray-500">=</span>{" "}
                          {(data.avgTemp - 273.15).toFixed(2)} &#x2103;
                        </dd>
                      </dl>
                    )}
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
