import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#">PlaNFT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/">Accueil</Link>
              <Link href="/soleil">Le Soleil</Link>
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