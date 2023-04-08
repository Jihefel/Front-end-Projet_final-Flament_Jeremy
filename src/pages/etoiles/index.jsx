import Hero from "./../../components/common/Hero";
import soleilImage from "public/assets/images/soleil/soleil.gif";
import CardNft from "@/components/CardNft";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md"

export default function SoleilIndex(props) {

  const router = useRouter();
  
  const [price, setPrice] = useState(null);

  useEffect(() => {
    setPrice((Math.random() * 10.00).toFixed(5));
  }, []);


  return (
    <section>
      <Hero lien="soleil/soleil-hero.webp" alt="Soleil" />
      <h1 className="titre-sec">Le Soleil</h1>
      <p className="p-sec">La carte NFT du Soleil est une représentation unique et authentique de notre étoile la plus proche. Avec ses couleurs vibrantes et sa forme caractéristique, cette carte est un véritable chef-d'œuvre numérique. Chaque détail a été minutieusement capturé pour donner vie à cette œuvre d'art numérique. En tant que propriétaire de cette carte NFT, vous aurez non seulement un accès exclusif à cette œuvre d'art, mais vous serez également l'un des seuls à posséder une partie de l'histoire de l'exploration spatiale.</p>
      <div className={"my-5 soleil-wrapper"}>
        <Card className="text-center legendary soleil">
          <Card.Header className="mb-3">
            <h1 className="titre mt-2 mb-5">{props.data.name}</h1>
            <Badge bg="warning" className="mt-2 mb-5 position-absolute">
              LEGENDARY
            </Badge>
          </Card.Header>
          <Image
            alt="soleil"
            src={soleilImage}
            className="mx-auto soleil-image my-3"
          />
          <Card.Body>
            <Card.Text className="mt-2">
            Le soleil, astre de feu, source de vie et de lumière, règne en maître dans notre système solaire. Il brille de mille feux, réchauffant les cœurs et éclairant les esprits. Tel un joyau céleste, il illumine notre univers et guide nos pas sur le chemin de la découverte.
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => router.push(`${router.pathname}/${props.data.id}`)}
              className="button-details"
            >
              Découvrir {props.data.name.at(0).toLowerCase() + props.data.name.substring(1)}
            </Button>
          </Card.Body>
          <Card.Footer className="text-white d-flex align-items-center justify-content-between py-4">
            <Button className="button-ajouter">
              <MdAddShoppingCart /> Acheter
            </Button>
            <div className="d-flex align-items-center justify-content-center gap-3">
              <h3 className="d-flex align-items-center justify-content-center m-0">{price} <FaEthereum /></h3>
            <small>{(props.dataEth.data[0].quote.EUR.price.toFixed(2) * price).toFixed(2)} &euro;</small>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </section>
  )
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