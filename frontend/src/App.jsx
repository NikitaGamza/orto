// import './app.scss';
// import HomeScreen from './components/HomeScreen';
// import ProductPage from './components/ProductPage';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import { LinkContainer } from 'react-router-bootstrap';
// import Badge from 'react-bootstrap/Badge';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { useContext, useEffect, useState } from 'react';
// import { Store } from './Store';
// import CartPage from './components/CartPage';
// import SigninPage from './components/SigninPage';
// import ShippingAddress from './components/ShippingAddress';
// import SignupPage from './components/SignupPage';
// import PaymentPage from './components/PaymentPage';
// import Button from 'react-bootstrap/esm/Button';
// import { getError } from './utils';
// import axios from 'axios';
// import SearchBox from './components/SearchBox';
// import SearchPage from './components/SearchPage';
// import ProductControl from './components/ProductControl/ProductControl';
// import AdminRoute from './components/AdminRoute';

function App() {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart, userInfo } = state;

  // const signoutHandler = () => {
  //   ctxDispatch({ type: 'USER_SIGNOUT' });
  //   localStorage.removeItem('userInfo');
  //   localStorage.removeItem('shippingAddress');
  // };
  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchCatigories = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/categories`);
  //       setCategories(data);
  //     } catch (err) {
  //       alert(getError(err));
  //     }
  //   };
  //   fetchCatigories();
  // }, []);

  return <div>Hello world!!</div>;
  // return (
  //   <BrowserRouter>
  //     <div
  //       className={
  //         sidebarIsOpen
  //           ? 'd-flex flex-column site-container active-cont'
  //           : 'd-flex flex-column site-container'
  //       }
  //     >
  //       <header className="app">
  //         <Navbar bg="dark" variant="dark">
  //           <Container>
  //             <Button
  //               variant="dark"
  //               onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
  //             >
  //               <i className="fas fa-bars"></i>
  //             </Button>
  //             <LinkContainer to="/">
  //               <Navbar.Brand>OrtoKomi</Navbar.Brand>
  //             </LinkContainer>
  //             <Nav className="me-auto">
  //               <SearchBox />
  //               <Link to="/cart" className="nav-link">
  //                 Корзина
  //                 {cart.cartItems.length > 0 && (
  //                   <Badge pill bg="danger">
  //                     {/* {cart.cartItems.length} */}
  //                     {/* было */}
  //                     {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
  //                   </Badge>
  //                 )}
  //               </Link>
  //               {userInfo ? (
  //                 <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
  //                   <LinkContainer to="/profile">
  //                     <NavDropdown.Item>Профиль</NavDropdown.Item>
  //                   </LinkContainer>
  //                   <LinkContainer to="/history">
  //                     <NavDropdown.Item>История заказов</NavDropdown.Item>
  //                   </LinkContainer>
  //                   <NavDropdown.Divider />
  //                   <Link
  //                     className="dropdown-item"
  //                     to="#signout"
  //                     onClick={signoutHandler}
  //                   >
  //                     Выход
  //                   </Link>
  //                 </NavDropdown>
  //               ) : (
  //                 <Link className="nav-link" to="signin">
  //                   Войти
  //                 </Link>
  //               )}
  //               {userInfo && userInfo.isAdmin && (
  //                 <NavDropdown title="Admin" id="admin-nav-dropdown">
  //                   <LinkContainer to="/admin/product-control">
  //                     <NavDropdown.Item>Товары</NavDropdown.Item>
  //                   </LinkContainer>
  //                 </NavDropdown>
  //               )}
  //             </Nav>
  //           </Container>
  //         </Navbar>
  //       </header>
  //       <div
  //         className={
  //           sidebarIsOpen
  //             ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
  //             : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
  //         }
  //       >
  //         <Nav className="flex-column text-white w-100 p-2">
  //           <Nav.Item>
  //             <strong>Категории</strong>
  //           </Nav.Item>
  //           {categories.map((category) => (
  //             <Nav.Item key={category}>
  //               <Link
  //                 to={`/search?category=${category}`}
  //                 onClick={() => setSidebarIsOpen(false)}
  //               >
  //                 <p className="cat-link">{category}</p>
  //               </Link>
  //             </Nav.Item>
  //           ))}
  //         </Nav>
  //       </div>
  //       <main>
  //         <Container>
  //           <Routes>
  //             <Route path="/" element={<HomeScreen />} />
  //             <Route path="/cart" element={<CartPage />} />
  //             <Route path="/search" element={<SearchPage />} />
  //             <Route path="/signin" element={<SigninPage />} />
  //             <Route path="/signup" element={<SignupPage />} />
  //             <Route path="/shipping" element={<ShippingAddress />} />
  //             <Route path="/payment" element={<PaymentPage />} />
  //             <Route path="/product/:slug" element={<ProductPage />} />
  //             {/* Admin Routes */}
  //             <Route
  //               path="/admin/product-control"
  //               element={
  //                 <AdminRoute>
  //                   <ProductControl />
  //                 </AdminRoute>
  //               }
  //             />
  //           </Routes>
  //         </Container>
  //       </main>
  //       <footer className="text-center">Все права защищены</footer>
  //     </div>
  //   </BrowserRouter>
  // );
}

export default App;
