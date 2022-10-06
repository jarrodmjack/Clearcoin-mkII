import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Portfolio from './pages/Portfolio'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App bg-base-100">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
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
      </BrowserRouter>
    </div>
  );
}

export default App;
