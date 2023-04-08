import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md"

function CardNft(props) {
  
  
  return (
    props.data.map((body, index) => (
        <div className="my-5 card-wrapper" key={index}>
        <Card className="text-center legendary soleil">
          <Card.Header>
            <h1>{body.name}</h1>
            <Badge bg="warning" text="dark" className="mb-3">
              LEGENDARY
            </Badge>
          </Card.Header>
          <Image
            alt="soleil"
            src={props.image}
            className="mx-auto soleil-image my-3"
            priority
          />
          <Card.Body>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content. fqqerghrtg erg er terg hth re gr hyr he zrh jyyrt t eztej
              eyt erzh ryt erzh rrt fezht
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => router.push(`${router.pathname}/${props.data.id}`)}
            >
              Plus de détails sur {props.data.name}
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            {props.price}
            <FaEthereum />{" "}
            {(props.dataEth.data[0].quote.EUR.price.toFixed(2) * price).toFixed(
              2
            )}{" "}
            €
          </Card.Footer>
        </Card>
      </div>
    )))
}

export default CardNft;