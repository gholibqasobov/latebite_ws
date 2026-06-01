import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Offers from './pages/Offers.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import CheckoutSuccess from './pages/CheckoutSuccess.jsx'
import Account from './pages/Account.jsx'
import Partner from './pages/Partner.jsx'
import About from './pages/About.jsx'
import Contacts from './pages/Contacts.jsx'
import Login from './pages/Login.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/account" element={<Account />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}
