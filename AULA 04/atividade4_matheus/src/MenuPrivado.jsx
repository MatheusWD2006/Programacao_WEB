import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router";

const MenuPrivado = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario");

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Painel Privado</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/privado">Home</NavLink>
            <NavLink className="nav-link" to="/privado/usuario">Usuário</NavLink>
            <NavLink className="nav-link" to="/privado/calculadora">Calculadora IMC</NavLink>
          </Nav>
          <Navbar.Text className="me-3">
            Logado como: <strong>{usuario}</strong>
          </Navbar.Text>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
};

export default MenuPrivado;