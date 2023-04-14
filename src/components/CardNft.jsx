import { Badge } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import comptes from "../data/comptes.json";
import { FaEthereum } from "react-icons/fa";

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
  const bouton = useRef()
  const [price, setPrice] = useState(null);
  const [compteActuel, setCompteActuel] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  // Prix de la carte random
  useEffect(() => {
    setPrice(Math.random().toFixed(5));
  }, []);

  useEffect(() => {
    const account = comptes?.find((compte) => compte.isConnected === true);
    setCompteActuel(account);
  }, [comptes]);

  useEffect(() => {
    const cardChanged = compteActuel?.favorites?.find(fav => fav.favdata.nom === bouton.current.id)
    if (cardChanged) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [compteActuel]);


  const handleChange = (e) => {
    const updatedAccount = { ...compteActuel, favorites: [...compteActuel.favorites, {favdata : {url: router.asPath, nom: props.data.name} }] };
  
    fetch(`/api/accounts/`, {
      method: "PUT",
      body: JSON.stringify(updatedAccount),
      headers : { 'Content-Type': 'application/json' },
    })
    .then((result) => result.json())
    .catch((error) => console.error(error));
  };
  

  
  return (
      <div className="card-wrapper">
        <Card className={'text-center card-nft ' +  (props.rarity === "lunaire" ? "bg-gradient-to-bl from-black to-zinc-700" : props.rarity === "planétaire" ? "bg-gradient-to-bl from-blue-500 to-emerald-700" : "bg-gradient-to-bl from-gray-300 to-amber-950")}>
          <Card.Header className="mb-3">
            <h1 className="titre my-2 text-white text-4xl">{props.data.name}</h1>
            <Badge
              color={props.rarity === "lunaire" ? "dark" : props.rarity === "planétaire" ? "success" : "failure"}
              className="my-2 uppercase absolute"
            >
              {props.rarity}
            </Badge>
          </Card.Header>
          <Image src={
              images[`.${router.asPath}.jpg`] ||
              images[`.${router.asPath}.jpeg`] ||
              images[`.${router.asPath}.png`] ||
              images[`.${router.asPath}.svg`] ||
              images[`.${router.asPath}.webp`]
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
            <Card.Footer className="text-white flex items-center justify-between py-3">
            {compteActuel === undefined || "" ? "" : (
              <label className="container-like">
              <input checked={isChecked} type="checkbox" onChange={handleChange} id={props.data.name} ref={bouton} />
              <div className="checkmark">
                <svg viewBox="0 0 300 300">
                <rect fill="none"></rect>
                <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" strokeWidth="20px" stroke="#FFF" fill="none"></path></svg>
              </div>
            </label>
            )}
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