import TermsConditions from "@/components/common/TermsConditions";
import Head from "next/head";
import { Container } from "react-bootstrap";

function TermesCond() {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PlaNFT - Termes et conditions</title>
      </Head>

      <Container>
        <h1 className="text-6xl mb-12 text-white">
          Termes et conditions d&apos;utilisation
        </h1>
        <TermsConditions />
      </Container>
    </>
  );
}

export default TermesCond;
