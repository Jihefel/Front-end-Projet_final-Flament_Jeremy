import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";
import { Container } from "react-bootstrap";
import logo from "../../public/assets/images/orrery_icon.svg";

export default function Inscription() {
  return (
    <>
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
