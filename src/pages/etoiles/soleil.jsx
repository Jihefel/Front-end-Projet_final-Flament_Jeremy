import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import sun2 from "public/assets/images/soleil/sun2.jpg";

export default function Soleil(props) {
  const data = props.data
  return (
    <section className="section-soleil-details">
      <Container>
        <h1 className="titre-sec-soleil titre">Le Soleil</h1>
        <Row>
          <Col sm={4}>
            <Image src={sun2} alt="Soleil" className="img-soleil-details" />
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
                    <dt>Volume : </dt>
                    <dd>
                      {data.vol.volValue} &times; 10
                      <sup>{data.vol.volExponent}</sup> &#x33A6;
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
  );
}

export async function getStaticProps() {
  // Récupérer les infos du soleil
  const response = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/soleil`
  );
  const data = await response.json();

  return {
    props: { data },
  };
}
