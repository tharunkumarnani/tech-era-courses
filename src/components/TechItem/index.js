import {Link} from 'react-router-dom'
import './index.css'

const TechItem = props => {
  const {techDetails} = props
  const {id, name, logoUrl} = techDetails
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="tech-item">
        <img alt={name} src={logoUrl} className="logo-style" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default TechItem
