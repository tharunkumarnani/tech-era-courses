import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
  console.log('header')
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          alt="website logo"
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        />
      </Link>
    </nav>
  )
}

export default Header
