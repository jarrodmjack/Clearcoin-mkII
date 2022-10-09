import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext() // user comes from localstorage in authcontext

  const handleClick = () => {
    logout()
  }

  return (
    <header className='py-8 bg-base-300'>
      <div className="container">
        <Link to="/">
          <h1 className='text-3xl text-white'>Clearcoin</h1>
        </Link>
        <nav>
          {user && (
            <div>
              {/* <span>{user.email}</span> */}
              <Link to='/fgindex'>
                <p className='btn btn-accent'>Market Sentiment</p>
              </Link>
              <Link to='/news'>
                <p className='btn btn-accent'>News</p>
              </Link>
              <Link to="/portfolio">
                <p className='btn btn-accent'>Portfolio</p>
              </Link>
              <button className='btn btn-accent' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>




  )
}

export default Navbar