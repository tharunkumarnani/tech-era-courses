import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TechItem from '../TechItem'
import FailureApi from '../FailureApi'
import './index.css'

const initializeStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {techLists: [], apiStatus: initializeStatus.loading}

  componentDidMount() {
    this.getTechLists()
  }

  getTechLists = async () => {
    this.setState({apiStatus: initializeStatus.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const {courses} = data
      const updatedData = courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        techLists: updatedData,
        apiStatus: initializeStatus.success,
      })
    } else {
      this.setState({apiStatus: initializeStatus.failure})
    }
  }

  onLoading = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  onSuccess = () => {
    const {techLists} = this.state
    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="tech-lists">
          {techLists.map(each => (
            <TechItem techDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  onRetryPage = () => {
    this.getTechLists()
  }

  onStatusChecker = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initializeStatus.loading:
        return this.onLoading()
      case initializeStatus.success:
        return this.onSuccess()
      case initializeStatus.failure:
        return <FailureApi onRetryPage={this.onRetryPage} />
      default:
        return null
    }
  }

  render() {
    return <div className="bg-cont">{this.onStatusChecker()}</div>
  }
}

export default Home
