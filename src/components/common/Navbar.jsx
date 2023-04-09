import Link from "next/link";
import { Titillium_Web } from "next/font/google";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Image from "next/image";
import { GiAstronautHelmet, GiSun, GiRingedPlanet, GiPlanetConquest, GiMoonOrbit, GiSpaceNeedle } from "react-icons/gi"

const titillium = Titillium_Web({
  weight: "400",
  subsets: ["latin"],
});
const isConnected = false;
function NavBar() {
  return (
    <>
      <Navbar fluid={false} rounded={true} >
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
        <Navbar.Toggle />
        <Navbar.Collapse className="flex items-center justify-between gap-5">
          <Link href="/" className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"><GiAstronautHelmet />Accueil</Link>
          <Link href="/etoiles" className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"><GiSun />Le Soleil</Link>
          <Link href="/navbars" className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"><GiRingedPlanet />Les planètes</Link>
          <Link href="/navbars" className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"><GiPlanetConquest />Les planètes naines</Link>
          <Link href="/navbars" className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"><GiMoonOrbit />Les lunes</Link>
          <Link href="/navbars" className="inline-flex items-center py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 md:border-0 text-white gap-1"><GiSpaceNeedle />Contact</Link>
        </Navbar.Collapse>
        <div className="connection-wrapper flex items-center justify-between">
          <Link
            href="#"
            className="text-white dark:text-white hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:text-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Se connecter
          </Link>
          <Link
            href="inscription"
            className="text-white bg-blue-700 hover:text-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:text-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            S&apos;inscrire
          </Link>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar;
