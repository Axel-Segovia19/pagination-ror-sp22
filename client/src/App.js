import Home from './components/shared/Home';
import NoMatch from './components/shared/NoMatch';
import MainNavbar from './components/shared/MainNavbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Routes, Route } from 'react-router-dom';
import FetchUser from './components/auth/FetchUser';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Container } from 'react-bootstrap';
import Languages from './components/languages/Languages';

const App = () => (
  <>
    <MainNavbar />
    <FetchUser>
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/languages" element={<Languages />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route component={NoMatch} />
        </Routes>
      </Container>
    </FetchUser>
  </>
)

export default App;