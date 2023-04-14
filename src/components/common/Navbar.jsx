import Link from "next/link";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Image from "next/image";
import {
  GiAstronautHelmet,
  GiSun,
  GiRingedPlanet,
  GiPlanetConquest,
  GiMoonOrbit,
  GiSpaceNeedle,
} from "react-icons/gi";
import comptes from "../../data/comptes.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import logo from "../../../public/assets/images/orrery_icon.svg";
import { Titillium_Web } from "next/font/google";

const titilliumWeb = Titillium_Web({
  weight: "400",
  subsets: ["latin"],
});

function NavBar() {
  const [compteActuel, setCompteActuel] = useState("");
  const router = useRouter();

  useEffect(() => {
    const account = comptes.find((compte) => compte.isConnected === true);
    setCompteActuel(account);
    if (account?.isConnected && router.asPath === "/connexion") {
      setTimeout(() => {
        router.replace("/", undefined, { shallow: true });
      }, 300);
    }
  }, [comptes]);

  const deconnexion = () => {
    const account = comptes.find((compte) => compte.isConnected === true);
    const updatedAccount = { ...account, isConnected: false };
    fetch("/api/accounts", {
      method: "PUT",
      body: JSON.stringify(updatedAccount),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((responseData) => {
        // Mettre à jour le compte actuel
        const updatedAccounts = [...comptes];
        updatedAccounts[updatedAccounts.indexOf(account)] = updatedAccount;
        // Naviguer vers la page suivante
        router.replace("/", undefined, { shallow: true });
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      <Navbar fluid={false} rounded={true} className={titilliumWeb.className}>
        <Navbar.Brand href="https://flowbite.com/">
          <Image
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="PlaNFT Logo"
            width={33}
            height={36}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            PlaNFT
          </span>
        </Navbar.Brand>
        {compteActuel === undefined || "" ? (
          <>
            <div className="connection-wrapper flex items-center justify-between md:order-2">
              <Link
                href="/connexion"
                className="text-white dark:text-white hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg t
                ext-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:text-gray-700 focus:outline-none dark:focus:ring-gray-800"
                shallow={true}
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                className="text-white bg-purple-950 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md
                :px-5 md:py-2.5 hover:bg-purple-700"
                shallow={true}
              >
                S&apos;inscrire
              </Link>
              <Navbar.Toggle />
            </div>
          </>
        ) : (
          <>
            <div className="flex lg:order-2">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    rounded={true}
                    className="my-4"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {compteActuel.prenom + " " + compteActuel.nom}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {compteActuel.email}
                  </span>
                </Dropdown.Header>
                <Link href="/favoris" shallow={true}>
                  <Dropdown.Item>
                    Favoris{" "}
                    {compteActuel?.favorites?.length !== 0
                      ? `(${compteActuel?.favorites?.length})`
                      : ""}
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item>Messages</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={deconnexion}>Déconnexion</Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
          </>
        )}
        <Navbar.Collapse className="flex items-center md:justify-between gap-5 w-full">
          <Link
            href="/"
            className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
            shallow={true}
          >
            <GiAstronautHelmet />
            Accueil
          </Link>
          <Link
            href="/etoiles"
            className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
            shallow={true}
          >
            <GiSun />
            Le Soleil
          </Link>
          <Link
            href="/planetes"
            className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
            shallow={true}
          >
            <GiRingedPlanet />
            Les planètes
          </Link>
          <Link
            href="/planetes-naines"
            className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
            shallow={true}
          >
            <GiPlanetConquest />
            Les planètes naines
          </Link>
          <Link
            href="/lunes"
            className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
            shallow={true}
          >
            <GiMoonOrbit />
            Les lunes
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
            shallow={true}
          >
            <GiSpaceNeedle />
            Contact
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
