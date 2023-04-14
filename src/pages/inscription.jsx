import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";
import { Container } from "react-bootstrap";
import logo from "../../public/assets/images/orrery_icon.svg";
import Head from "next/head";

export default function Inscription() {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inscription</title>
      </Head>
      <Container>
        <div>
          <Image className="mx-auto h-12 w-auto" src={logo} alt="PlanNFT" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Inscription
          </h2>
        </div>
        <SignUpForm />
      </Container>
    </>
  );
}
