import { Link, NavLink } from 'react-router-dom'
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
            <div className=''>
              <div className='hidden lg:block'>
              <Link to='/exchanges'>
                  <p className='btn btn-ghost text-white'>Exchanges</p>
                </Link>
                <Link to='/fgindex'>
                  <p className='btn btn-ghost text-white'>Market Sentiment</p>
                </Link>
                <Link to='/news'>
                  <p className='btn btn-ghost text-white'>News</p>
                </Link>
                <Link to="/portfolio">
                  <p className='btn btn-ghost text-white'>Portfolio</p>
                </Link>
                <button className='btn btn-accent text-white' onClick={handleClick}>Log out</button>
              </div>
              <div className="dropdown dropdown-end block lg:hidden">
                <label tabIndex={0} className="btn btn-accent m-1">Menu <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to='/fgindex'>
                      <p className=''>Market Sentiment</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to='/news'>
                      <p className=''>News</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to="/portfolio">
                      <p className=''>Portfolio</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to="/logout">
                      <p className=''>Log out</p>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* className={({ isActive }) =>
              isActive
                ? "!bg-accent !text-accent-content"
                : "active:bg-accent-focus"
            } */}

          {!user && (
            <div>
              <div className='hidden lg:block'>
              <Link to='/exchanges'>
                  <p className='btn btn-ghost text-white'>Exchanges</p>
                </Link>
                <Link to='/fgindex'>
                  <p className='btn btn-ghost text-white'>Market Sentiment</p>
                </Link>
                <Link to='/news'>
                  <p className='btn btn-ghost text-white'>News</p>
                </Link>
                <Link className='btn btn-ghost text-white' to='/login'>Login</Link>
                <Link className='btn btn-ghost text-white' to='/signup'>Sign up</Link>
              </div>
              <div className="dropdown dropdown-end lg:hidden">
                <label tabIndex={0} className="btn btn-ghost m-1">Menu <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to='/exchanges'>
                      <p className=''>Exchanges</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to='/fgindex'>
                      <p className=''>Market Sentiment</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to='/news'>
                      <p className=''>News</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to="/login">
                      <p className=''>Login</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) =>
                      isActive
                        ? "!bg-accent !text-accent-content"
                        : "active:bg-accent-focus"
                    } to="/signup">
                      <p className=''>Sign up</p>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

          )}
        </nav>
      </div>
    </header>


  )
}

export default Navbar