import { Badge } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

import { FaEthereum } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md"

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

// Import all images in subdirectories of ./public/assets/images/
importAll(
  require.context("../../public/assets/images", true, /\.(png|jpe?g|svg|webp)$/)
);


function CardNft(props) {
  const router = useRouter();
  const [price, setPrice] = useState(null);

  // Prix de la carte random
  useEffect(() => {
    setPrice(Math.random().toFixed(5));
  }, []);
  
  return (
      <div className="card-wrapper">
        <Card className={'text-center card-nft ' +  (props.rarity === "lunaire" ? "bg-gradient-to-bl from-black to-zinc-700" : props.rarity === "commun" ? "dark" : "")}>
          <Card.Header className="mb-3">
            <h1 className="titre my-2 lunes">{props.data.name}</h1>
            <Badge
              color={props.rarity === "lunaire" ? "dark" : props.rarity === "commun" ? "dark" : ""}
              className="my-2 position-absolute uppercase"
            >
              {props.rarity}
            </Badge>
          </Card.Header>
          <Image src={
              images[`./lunes/${props.data.aroundPlanet.planet}/${props.data.id}.jpg`] ||
              images[`./lunes/${props.data.aroundPlanet.planet}/${props.data.id}.jpeg`] ||
              images[`./lunes/${props.data.aroundPlanet.planet}/${props.data.id}.png`] ||
              images[`./lunes/${props.data.aroundPlanet.planet}/${props.data.id}.svg`] ||
              images[`./lunes/${props.data.aroundPlanet.planet}/${props.data.id}.webp`]
            } 
            alt={props.data.id} className="" 
          />
          <Card.Body>
            {/* <Card.Text className={props.rarity === "lunaire" ? "text-white" : props.rarity === "commun" ? "dark" : ""}>
              With supporting text below as a natural lead-in to additional
              content. fqqerghrtg erg er terg hth re gr hyr he zrh jyyrt t eztej
              eyt erzh ryt erzh rrt fezht
            </Card.Text> */}
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
  )
}

export default CardNft;

export async function getStaticProps() {

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
    console.log(dataEth)
  return {
    props: { dataEth },
  };
}