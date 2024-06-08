import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faUser, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
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
                <Nav.Link as={Link} to="/" style={{ marginLeft: '3rem' }}>
                  <FontAwesomeIcon icon={faUser} /> Login
                </Nav.Link>

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
              <Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
