import { AuthConsumer } from "../../providers/AuthProvider";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";
import { MainNavLink } from "../../styles/sharedStyles";

const MainNavbar = ({ user, handleLogout }) => {
  
  const rightNavItems = () => {
    // links to show up when logged in
    if (user) {
      return (
        <>
          <Nav.Link>
            <MainNavLink to='/languages'>
              Languages
            </MainNavLink>
          </Nav.Link>
          <Nav.Link>
            <li onClick={ () => handleLogout() }>
              Logout
            </li>
          </Nav.Link>
        </>
      )
    } else {
      // links to show up when Not logged in
      return (
        <>
          <Nav.Link>
            <MainNavLink to='/login'>
              Login
            </MainNavLink>
          </Nav.Link>
          <Nav.Link>
            <MainNavLink to='/register'>
              Register
            </MainNavLink>  
          </Nav.Link>
        </>
      )
    }
  }
  
  // links that show up regardless of login or out
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <MainNavLink to='/'>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              My App
            </MainNavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav className="justify-content-end">
              { rightNavItems() }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

const ConnectedNavbar = (props) => (
  <AuthConsumer> 
    { value => <MainNavbar { ...props } { ...value } /> }
  </AuthConsumer>
)
 
export default ConnectedNavbar;