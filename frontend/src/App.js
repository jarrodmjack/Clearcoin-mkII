import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Portfolio from './pages/Portfolio'
import Footer from './components/Footer'
import CurrencyCarousel from './components/CurrencyCarousel'
import News from './pages/News'
import FearAndGreed from './pages/FearAndGreed'
import Exchanges from './pages/Exchanges'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App bg-base-100">
      <BrowserRouter>
        <CurrencyCarousel />
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/exchanges"
              element={<Exchanges />}
            />
            <Route
              path="/fgindex"
              element={<FearAndGreed />}
            />
            <Route
              path="/news"
              element={<News />}
            />
            <Route
              path="/portfolio"
              element={<Portfolio />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


export default App;
