import Hero from "./../../components/common/Hero";
import soleilImage from "public/assets/images/soleil/soleil.gif";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect, useRef } from "react";
import { Card, Button, Badge, Container } from "react-bootstrap";
import { Tooltip } from "flowbite-react";
import { FaEthereum } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "@/components/common/Loader";
import useSound from "use-sound";
import sunSonification from "public/assets/audio/NASA-Sun_Sonification.mp3";

export default function SoleilIndex(props) {
  const router = useRouter();
  const pageEndRef = useRef(null);
  const [playSunSound, { stop }] = useSound(sunSonification);

  // Fonction de scroll to bottom
  const handleScrollToBottom = () => {
    pageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [price, setPrice] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isUnveiled, setIsUnveiled] = useState(false);

  // Prix de la carte random
  useEffect(() => {
    setPrice((Math.random() * 10.0).toFixed(5));
  }, []);

  // Quand la carte est dévoilée, scroll to bottom
  useEffect(() => {
    if (isUnveiled) {
      handleScrollToBottom();
    }
  }, [isUnveiled]);


  //TODO - Head
  return (
    <section className="py-5">
      <Container>
        <h1 className="titre-sec-soleil titre">Le Soleil</h1>
        <p className="p-sec-soleil">
          La carte NFT légendaire interactive du Soleil est une représentation
          unique et authentique de notre étoile la plus proche. Avec ses
          couleurs vibrantes et sa forme caractéristique, cette carte est un
          véritable chef-d&apos;œuvre numérique. Chaque détail a été
          minutieusement capturé pour donner vie à cette œuvre d&apos;art
          numérique. En tant que propriétaire de cette carte NFT, vous aurez non
          seulement un accès exclusif à cette œuvre d&apos;art, mais vous serez
          également l&apos;un des seuls à posséder une partie de l&apos;histoire
          de l&apos;exploration spatiale.
        </p>
        {isUnveiled ? (
          <>
          <div ref={pageEndRef} />
            <div className={"my-5 soleil-wrapper" + (isUnveiled ? " rotate" : "") }>
              <Card
                className={
                  "text-center legendary " + (isClicked ? "zoom" : "soleil")
                }
              >
                <Card.Header className="mb-3">
                  <h1 className="titre mt-2 mb-5">{props.data.name}</h1>
                  <Badge
                    bg="warning"
                    className="mt-2 mb-5 position-absolute uppercase"
                  >
                    légendaire
                  </Badge>
                </Card.Header>
                <Image
                  alt="soleil"
                  src={soleilImage}
                  className="mx-auto soleil-image my-3"
                />
                <Card.Body className="pt-1 pb-4">
                  <Card.Text>
                    Le soleil, astre de feu, source de vie et de lumière, règne
                    en maître dans notre système solaire. Il brille de mille
                    feux, réchauffant les cœurs et éclairant les esprits. Tel un
                    joyau céleste, il illumine notre univers et guide nos pas
                    sur le chemin de la découverte.
                  </Card.Text>
                  <div className="button-bg">
                    <Button
                      onClick={() =>
                        router.push(`${router.pathname}/${props.data.id}`)
                      }
                      className="button-details"
                    >
                      Découvrir{" "}
                      {props.data.name.at(0).toLowerCase() +
                        props.data.name.substring(1)}
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-white flex items-center justify-between py-4">
                  <Button
                    className="button-ajouter flex items-center justify-between gap-2"
                    onClick={() => setIsClicked(!isClicked)}
                  >
                    <MdAddShoppingCart /> Acheter
                  </Button>
                  <div className="flex items-center justify-center gap-3">
                    <h3 className="flex items-center justify-center m-0 prix">
                      {price} <FaEthereum />
                    </h3>
                    <small>
                      {(
                        props.dataEth.data[0].quote.EUR.price.toFixed(2) * price
                      ).toFixed(2)}{" "}
                      &euro;
                    </small>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </>
        ) : (
          <div className="devoiler mx-auto my-60">
            <Tooltip
              content={
                <>
                  <span>
                    Vous écoutez le son réél du Soleil capturé par la NASA
                  </span>
                  <br />{" "}
                  <a href="https://www.nasa.gov/feature/goddard/2018/sounds-of-the-sun" target="_blank">
                    https://www.nasa.gov/feature/goddard/2018/sounds-of-the-sun
                  </a>
                </>
              }
              style="dark"
              animation="duration-300"
              className="text-center"
            >
              <Button
                className="button-details py-4 px-5 text-2xl rounded-full uppercase"
                onClick={() => {
                  setIsUnveiled(true);
                  stop();
                }}
                onMouseEnter={() => playSunSound()}
                onMouseLeave={() => stop()}
              >
                Dévoiler la carte
              </Button>
            </Tooltip>
          </div>
        )}
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
    props: { data, dataEth },
  };
}
