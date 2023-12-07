import {Component} from 'react'
import Loader from 'react-loader-spinner'
import FailureApi from '../FailureApi'
import './index.css'

const initializeStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechItemDetails extends Component {
  state = {courseDetails: [], apiStatus: initializeStatus.loading}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: initializeStatus.loading})
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const fetchedDetails = data.course_details
      const updateDetails = {
        id: fetchedDetails.id,
        name: fetchedDetails.name,
        description: fetchedDetails.description,
        imageUrl: fetchedDetails.image_url,
      }
      this.setState({
        courseDetails: updateDetails,
        apiStatus: initializeStatus.success,
      })
    } else {
      this.setState({apiStatus: initializeStatus.failure})
    }
  }

  onSuccess = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="img-details">
        <img src={imageUrl} alt={name} className="course-img" />
        <div className="details">
          <h1 className="name">{name}</h1>
          <p className="des">{description}</p>
        </div>
      </div>
    )
  }

  onLoading = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  onRetryPage = () => {
    this.getCourseDetails()
  }

  onStatusChecker = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initializeStatus.loading:
        return this.onLoading()
      case initializeStatus.failure:
        return <FailureApi onRetryPage={this.onRetryPage} />

      case initializeStatus.success:
        return this.onSuccess()

      default:
        return null
    }
  }

  render() {
    return <div className="course-bg">{this.onStatusChecker()}</div>
  }
}

export default TechItemDetails
