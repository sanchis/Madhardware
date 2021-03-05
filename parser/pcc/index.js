import axios from 'axios'
import cheerio from 'cheerio'

const baseUrl = 'https://www.pccomponentes.com'
const SEARCH_URL = (text) => `${baseUrl}/buscar/ajax?query=${text}&page=0`

export function searchProduct (text) {
  // TODO control the first element exist
  return axios.post(SEARCH_URL(text))
    .then(res => res.data)
    .then(data => cheerio.load(data))
    .then(dom => dom('.GTM-productClick')[0].attribs.href)
    .then(findByUrl)
}

function findByUrl (url) {
  return axios.get(`${baseUrl}${url}`)
    .then(res => res.data)
    .then(populateData)
}

function populateData (html) {
  const page = cheerio.load(html)
  const product = JSON.parse(page('#microdata-product-script').html())
  const price = page('.unit_price').text()

  return {
    price: Number(price),
    name: product.name,
    url: product.url,
    image: `https:${product.image}`
  }
}
