export function ErrorHandler (err, req, res, next) {
  console.error(`${req.url} - ${req.method}`)
  console.error('Query: ', req.query)
  console.error('Body: ', req.body)

  console.error('ERROR', err)
  const responseError = {
    error: err?.message?.toString() || 'Unexpected error.'
  }

  // Can we set the status code before send response in the controller.
  res.status(err?.code || 500).json(responseError)
}
