import './index.css'

const FailureApi = props => {
  const {onRetryPage} = props
  const requestReload = () => {
    onRetryPage()
  }
  console.log('fail')
  return (
    <div className="failure-bg">
      <img
        alt="failure view"
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="fail-des">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={requestReload} type="button" className="retry">
        Retry
      </button>
    </div>
  )
}

export default FailureApi
