import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Outlet } from "react-router";

const MenuPublico = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Aplicação React</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
};

export default MenuPublico;