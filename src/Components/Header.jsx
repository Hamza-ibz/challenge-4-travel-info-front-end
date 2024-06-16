import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faUser, faBookmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import InfoModal from './utils/InfoModal';

const Header = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoggedIn = () => {
    if (localStorage.getItem('token') != null) {
      setLoggedIn(true);
      localStorage.removeItem('token');
      // alert("you have logged out");
      navigate('/login');
    } else {
      setLoggedIn(false);
    }
  }

  const handleLogout = () => {
    // <InfoModal closeModal={""} message={"Location not found, please check input. (" + error.message + ")"} />
    // localStorage.removeItem('token');
    // alert("you have logged out");
    // navigate('/login');
    checkLoggedIn();
  };



  return (
    <header>
      <Navbar bg="dark" key='xl' expand='xl' className="bg-primary-subtle mb-3">
        <Container fluid>
          <Navbar.Brand to="/">WeatherWhenever</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${'xl'}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link as={Link} to="/" style={{ marginLeft: '3rem' }}>
                  <FontAwesomeIcon icon={faHouseChimney} /> Home
                </Nav.Link >
                {localStorage.getItem('token') === null ? (
                  <Nav.Link as={Link} to="/login" style={{ marginLeft: '3rem' }}>
                    <FontAwesomeIcon icon={faUser} /> Login
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login" style={{ marginLeft: '3rem' }} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Nav.Link>
                )}

                {loggedIn && <InfoModal closeModal={() => setLoggedIn(false)} message={"User has Logged out."} />}
                <NavDropdown
                  title={<span>
                    <FontAwesomeIcon icon={faBookmark} /> Favourite
                  </span>}
                  id={`offcanvasNavbarDropdown-expand-xl`}
                  style={{ marginLeft: '3rem' }}
                >

                  <NavDropdown.Item as={Link} to="/">Action</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {useLocation().pathname === '/' ? '' :
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
