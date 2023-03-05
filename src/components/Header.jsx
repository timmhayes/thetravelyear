
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import countries from '../data/countries.json';
import months from '../data/months.json';
import './Header.scss';

function Header() {

  return (
    <Navbar sticky="top" expand="md" bg="primary" variant="dark">
      <Container>
        <LinkContainer to={`/`}>
          <Navbar.Brand>The Travel Year</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto" >
            <LinkContainer to={`/about`}>
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Countries">
            <LinkContainer to="/countries">
              <NavDropdown.Item >All Countries</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            {countries.map((continent, index) => (
              <div className="header-country-group" key={continent.name}>
                <NavDropdown.Header>{continent.name}</NavDropdown.Header>
                    {continent.countries.map((country, index) => (
                      <LinkContainer to={`/countries/${encodeURIComponent(country)}`} key={country}>
                        <NavDropdown.Item className="inline-header-link">{country}</NavDropdown.Item>
                      </LinkContainer>
                    ))}
                {(index !== countries.length - 1) && <NavDropdown.Divider />}
              </div>
            ))}
            </NavDropdown>
            <NavDropdown title="Posts By Date">
              <LinkContainer to="/months">
                <NavDropdown.Item >All Dates</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              {months.map((month, index) => (
                <LinkContainer to={`/months/${index}`} key={month}>
                  <NavDropdown.Item>{month}</NavDropdown.Item>
                </LinkContainer>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;