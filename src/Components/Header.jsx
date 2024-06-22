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
import { getWeatherService } from '../services/weatherService';

const Header = ({ favouritePlace }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [error, setError] = useState({ message: ``, type: ``, display: false });

  const checkLoggedIn = () => {
    if (localStorage.getItem('token') != null) {
      setLoggedIn(true);
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      setLoggedIn(false);
    }
  }

  const handleLogout = () => {
    checkLoggedIn();
  };

  const getSearch = async () => {
    const returnedData = await getWeatherService(search);
    if (returnedData instanceof Error) {
      setError({
        message: returnedData.message,
        type: `get`,
        display: true,
      });
      setSearch('');
    } else {
      setError({
        message: returnedData.message,
        type: `get`,
        display: false,
      });
      navigate(`/weather/${search}`);
    }
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    getSearch();
  };

  return (
    <header>
      <Navbar bg="dark" key='xl' expand='xl' className="bg-primary-subtle mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">WeatherWhenever</Navbar.Brand>
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
                <NavDropdown
                  title={<span>
                    <FontAwesomeIcon icon={faBookmark} /> Favourite
                  </span>}
                  id={`offcanvasNavbarDropdown-expand-xl`}
                  style={{ marginLeft: '3rem' }}
                >
                  <NavDropdown.Item as={Link} to="/all-favourites">All Favourite Places</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {favouritePlace.length > 0 ? (
                    favouritePlace.map((fav, index) => (
                      <NavDropdown.Item key={index} as={Link} to={`/weather/${fav.location}`}>
                        {fav.location}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <NavDropdown.Item>No favourites added yet</NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3" >
                {useLocation().pathname === '/' ? '' :
                  <Form className="d-flex" onSubmit={submit}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      value={search}
                      onChange={handleChange}
                    />
                    <Button variant="outline-success" type="submit">Search</Button>
                  </Form>}
                {error.display ? <p>Location not found, please check input</p> : null}
                {error.display && <InfoModal closeModal={() => setError({ ...error, display: false })} message={"Location not found, please check input. (" + error.message + ")"} />}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

