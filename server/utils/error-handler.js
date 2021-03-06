export function ErrorHandler (err, req, res, next) {
  console.error(`${req.url} - ${req.method}`)
  console.error('Query: ', req.query)
  console.error('Body: ', req.body)
  console.trace()

  const responseError = {
    error: err.toString() || 'Unexpected error.'
  }

  // Can we set the status code before send response in the controller.
  res.status(res.statusCode > 399 ? res.statusCode : 500).json(responseError)
}
