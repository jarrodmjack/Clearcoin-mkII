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
{/* <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      </ul> */}
          {!user && (
            <div>
              <Link to='/fgindex'>
                <p className='btn btn-accent'>Market Sentiment</p>
              </Link>
              <Link to='/news'>
                <p className='btn btn-accent'>News</p>
              </Link>
              <Link className='btn btn-accent' to='/login'>Login</Link>
              <Link className='btn btn-accent' to='/signup'>Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>


  )
}

export default Navbar