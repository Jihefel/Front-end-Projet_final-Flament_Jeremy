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



function NavBar() {
  const [compteActuel, setCompteActuel] = useState("");
  const router = useRouter();

  useEffect(() => {
    const account = comptes?.find((compte) => compte.isConnected === true);
    setCompteActuel(account);
    if (account?.isConnected) {
      router.replace("/")
    }
  }, [comptes]);

  const deconnexion = () => {
    fetch("/api/accounts", {
      method: "PUT",
      body: JSON.stringify(compteActuel),
      headers : { 'Content-Type': 'application/json',}
    })
      .then((result) => result.json())
      .then((responseData) => {
        if (!compteActuel) {
          console.error("Adresse e-mail inconnue");
          return;
        }
        const accountPassword = comptes.find(
          (account) => account.password === password
        )
        if (!accountPassword) {
          console.error("Mot de passe incorrect");
          return;
        }
        router.replace("/");
        // Mettre à jour le compte actuel
        const updatedAccount = { ...compteActuel, isConnected: false };
        const updatedAccounts = [...comptes];
        updatedAccounts[updatedAccounts.indexOf(compteActuel)] = updatedAccount;
        // Naviguer vers la page suivante
        router.replace("/");
      })
      .catch((error) => console.error(error.message));
  };


  return (
    <>
      <Navbar fluid={false} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
            width={32}
            height={33}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        {compteActuel === undefined || "" ? (
          <>
            <div className="connection-wrapper flex items-center justify-between md:order-2">
              <Link
                href="/connexion"
                className="text-white dark:text-white hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:text-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                className="text-white bg-blue-700 hover:text-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:text-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                S&apos;inscrire
              </Link>
              <Navbar.Toggle />
            </div>
          </>
        ) : (
          <>
            <div className="flex md:order-2">
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
                  <span className="block text-sm">{compteActuel.prenom + " " + compteActuel.nom}</span>
                  <span className="block truncate text-sm font-medium">
                    {compteActuel.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Favoris</Dropdown.Item>
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
              >
                <GiAstronautHelmet />
                Accueil
              </Link>
              <Link
                href="/etoiles"
                className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
              >
                <GiSun />
                Le Soleil
              </Link>
              <Link
                href="/planetes"
                className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
              >
                <GiRingedPlanet />
                Les planètes
              </Link>
              <Link
                href="/planetes-naines"
                className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
              >
                <GiPlanetConquest />
                Les planètes naines
              </Link>
              <Link
                href="/lunes"
                className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
              >
                <GiMoonOrbit />
                Les lunes
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"
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
