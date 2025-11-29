import "./Tabs.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";

function Tabs() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar className="bg-body-tertiary">

    <Container id="navtab">

        <Nav id="tab" >
          <Nav.Item>
            <NavLink to="/" id="nav-link">
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/Recipes" id="nav-link">
              Recettes
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/Dashboard" id="nav-link">
              Dashboard
            </NavLink>
          </Nav.Item>
        </Nav>
    </Container>
    </Navbar>

  );
}

export default Tabs;
