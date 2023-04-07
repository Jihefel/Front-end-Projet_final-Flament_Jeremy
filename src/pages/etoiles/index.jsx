import Image from "next/image";
import { useRouter } from "next/router";
import soleilImage from "public/assets/images/soleil/soleil.gif";
import { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa"
import Hero from './../../components/common/Hero';


export default function SoleilIndex(props) {
  const router = useRouter();

  const [price, setPrice] = useState(null);

  useEffect(() => {
    setPrice(Math.random().toFixed(4));
  }, []);


  return (
    <>
      <Hero lien="soleil/soleil-hero.webp" alt={props.data.id} />
      <div className="py-5">
        <Card className="text-center legendary soleil">
          <Card.Header>
            <h1>{props.data.name}</h1> 
            <Badge bg="warning" text="dark">
          LEGENDARY
        </Badge>
        </Card.Header>
          <Image alt="soleil" src={soleilImage} className="mx-auto soleil-image my-3" priority />
          <Card.Body>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content. fqqerghrtg erg er terg hth re gr hyr he zrh jyyrt t eztej eyt erzh ryt erzh rrt fezht
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => router.push(`${router.pathname}/${props.data.id}`)}
            >
              Plus de détails sur {props.data.name}
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
          {price}<FaEthereum />  {(props.dataEth.data[0].quote.EUR.price.toFixed(2) * price).toFixed(2)} €
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/soleil`
  );
  const data = await response.json();

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
