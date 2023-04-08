import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Titillium_Web } from 'next/font/google'

const titillium = Titillium_Web({
  weight: '400',
  subsets: ['latin'],
})

function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="md" className={titillium.className}>
        <Container>
          <Navbar.Brand href="#">PlaNFT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/">Accueil</Link>
              <Link href="/etoiles">Le Soleil</Link>
              <Link href="/planetes">Les planètes</Link>
              <Link href="/planetes-naines">Les planètes naines</Link>
              <Link href="/lunes">Les lunes</Link> {/* //TODO - Faires qq lunes des planètes */}
              <Link href="/contact">Contact</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;