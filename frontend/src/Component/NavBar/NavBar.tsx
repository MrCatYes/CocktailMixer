// Navbar Component

import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { Button, Form } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

type NavBarProps = {
  theme: string;
  toggleTheme: ()=> void;
};

function NavBar({ theme, toggleTheme } : NavBarProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  //check if a user is logged in
  let isLoggedIn = false;

  function handleLogout(e : React.MouseEvent<HTMLButtonElement>)  
  {
    auth.logout();
    navigate("/");

  }

  if (auth.token) 
    {
    isLoggedIn = true;
    }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
        
           <img src="/images/IMG_2263.jpg" alt="" width="100" className="d-inline-block align-text-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          {isLoggedIn ? (
            <Nav className="me-auto">
              <Nav.Link href="/">
              <Button variant="dark"  onClick={handleLogout}>
                  Logout
                  </Button>
                  </Nav.Link>
                  </Nav>) :
                  (<Nav className="me-auto"  >
                    <NavLink to="/login" id="nav-link">Login</NavLink>
                    <NavLink to="/register" id="nav-link">Register</NavLink>
                  </Nav>
                  )}

          <Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Form>
            <Form.Check type="switch" onClick={() => toggleTheme()} />
          </Form>
          {
            // switch the name of the mode in the Navbar

            theme === "light" ? (
              <Navbar.Text style={{ marginLeft: "10px" }}>LightMode </Navbar.Text>
            ) : (
              <Navbar.Text style={{ marginLeft: "10px" }}>DarkMode </Navbar.Text>
            )
          }
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
export default NavBar;
