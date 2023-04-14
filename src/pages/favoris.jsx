import { useRouter } from "next/router";
import comptes from "../data/comptes.json";
import { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { GoTrashcan } from "react-icons/go";
import Head from "next/head";

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

// Import all images in subdirectories of ./public/assets/images/
importAll(
  require.context(
    "../../public/assets/images",
    true,
    /\.(png|jpe?g|svg|webp|gif)$/
  )
);

function Favoris() {
  const router = useRouter();
  const [compteActuel, setCompteActuel] = useState("");

  useEffect(() => {
    const account = comptes?.find((compte) => compte.isConnected === true);
    setCompteActuel(account);
    // if (compteActuel === "" || undefined ) {
    //   router.replace("/404");
    // }
  }, []);

  const remove = (e) => {
    const cardRemoved = compteActuel?.favorites.find(
      (fav) => fav.favdata.nom === e.target.getAttribute("id")
    );
    const updatedAccount = {
      ...compteActuel,
      favorites: [...compteActuel.favorites, cardRemoved],
    };

    fetch(`/api/accounts/`, {
      method: "PUT",
      body: JSON.stringify(updatedAccount),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Favoris</title>
      </Head>
      <Container>
        <h1 className="titre titre-sec-favoris">Mes favoris</h1>
        <div className="flex justify-evenly flex-wrap favoris">
          {compteActuel === undefined || ""
            ? null
            : compteActuel.favorites?.map((fav) => (
                <Card key={fav.favdata.nom} className="max-w-xs my-3">
                  <Image
                    alt={fav.favdata.nom}
                    src={
                      images[`.${fav.favdata.url}.jpg`] ||
                      images[`.${fav.favdata.url}.jpeg`] ||
                      images[`.${fav.favdata.url}.png`] ||
                      images[`.${fav.favdata.url}.svg`] ||
                      images[`.${fav.favdata.url}.webp`] ||
                      images[
                        `.${
                          fav.favdata.url.includes("/etoiles")
                            ? "/soleil/soleil"
                            : fav.favdata.url
                        }.gif`
                      ]
                    }
                  />
                  <div className="flex flex-col gap-4 mt-3">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                      {fav.favdata.nom}
                    </h5>
                    <div className="flex justify-between items-center">
                      <Link href={fav.favdata.url}>
                        <Button color="dark">
                          Vers {fav.favdata.nom.replace(/[0-9,()]/g, "")}
                        </Button>
                      </Link>
                      <Button
                        color="dark"
                        onClick={remove}
                        id={fav.favdata.nom}
                      >
                        <GoTrashcan />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      </Container>
    </>
  );
}

export default Favoris;
