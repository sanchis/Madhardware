import axios from 'axios'
import cheerio from 'cheerio'
import { ConfigAxios, ProductNotFound } from '../config'

const baseUrl = 'https://www.pccomponentes.com'
const SEARCH_URL = (text) => `${baseUrl}/buscar/ajax?query=${text}&page=0`

export function searchProduct (text) {
  return axios.post(SEARCH_URL(text), undefined, ConfigAxios)
    .then(res => res.data)
    .then(data => cheerio.load(data))
    .then(dom => {
      const links = dom('.GTM-productClick')
      if (links?.length > 0) {
        return links.first().attr('href')
      }
      ProductNotFound()
    })
    .then(findByUrl)
}

function findByUrl (url) {
  if (!url || url === '') {
    return ProductNotFound()
  }

  return axios.get(`${baseUrl}${url}`, ConfigAxios)
    .then(res => res.data)
    .then(populateData)
}

function populateData (html) {
  try {
    const page = cheerio.load(html)

    const product = page('#add-cart')
    const name = product.attr('data-name')
    const url = page('link[rel="canonical"]').attr('href')
    const image = page('.image_url').text()
    const price = page('.unit_price').text()
    const description = page('#ficha-producto-caracteristicas').text()

    return {
      price: parseFloat(price),
      name: name,
      url: url,
      description,
      image: image
    }
  } catch (error) {
    console.error(error)
    return ProductNotFound()
  }
}
