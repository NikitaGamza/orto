import './App.scss';
import HomePage from './pages/HomePage';
import ProductAdminPage from './pages/ProductPage';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Store } from './Store';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import Button from 'react-bootstrap/esm/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchPage from './pages/SearchPage';
import ProductControl from './pages/admin-pages/ProductAdminPage';
import AdminRoute from './routing/AdminRoute';
import ProductCategory from './components/admin/ProductCategory';
import { getProductCategory } from "./api/product";
import SideBar from "./components/SideBar";
import Header from "./components/header";
import Routing from "./routing/Routing";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCatigories = async () => {
    try {
      const {data} = await getProductCategory()

      setCategories(data);
    } catch (err) {
      alert(getError(err));
    }
  };

  useEffect(() => {
    fetchCatigories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <Header userInfo={userInfo} signoutHandler={signoutHandler} cart={cart} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />


        <SideBar categories={categories} sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />


        <main>
          <Container>
            <Routing />
          </Container>
        </main>

        <footer className="text-center">Все права защищены</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
