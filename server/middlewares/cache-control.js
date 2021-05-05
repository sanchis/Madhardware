export function CacheControl ({ seconds }) {
  return (req, res, next) => {
    res.setHeader('Cache-control', `s-maxage=${seconds}, stale-while-revalidate`)
    next()
  }
}
