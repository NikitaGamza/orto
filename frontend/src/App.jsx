import './app.scss';
import HomeScreen from './components/HomeScreen';
import ProductPage from './components/ProductPage';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';
import { Store } from './Store';
import CartPage from './components/CartPage';
import SigninPage from './components/SigninPage';
import ShippingAddress from './components/ShippingAddress';
import SignupPage from './components/SignupPage';
import PaymentPage from './components/PaymentPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header className="app">
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>OrtoKomi</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Корзина
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {/* {cart.cartItems.length} */}
                      {/* было */}
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Профиль</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/history">
                      <NavDropdown.Item>История заказов</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Выход
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="signin">
                    Войти
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">Все права защищены</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
