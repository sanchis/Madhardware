import axios from 'axios'
import cheerio from 'cheerio'

const baseUrl = 'https://www.pccomponentes.com'
const fakeUAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
const configAxios = {
  headers: {
    'User-Agent': fakeUAgent
  }
}
const SEARCH_URL = (text) => `${baseUrl}/buscar/ajax?query=${text}&page=0`

export function searchProduct (text) {
  return axios.post(SEARCH_URL(text), undefined, configAxios)
    .then(res => res.data)
    .then(data => cheerio.load(data))
    .then(dom => {
      const links = dom('.GTM-productClick')
      if (links?.length > 0) {
        return dom('.GTM-productClick')[0].attribs.href
      }
      productNotFound()
    })
    .then(findByUrl)
}

function findByUrl (url) {
  if (!url || url === '') {
    return productNotFound()
  }

  return axios.get(`${baseUrl}${url}`, configAxios)
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
      price: Number(price),
      name: name,
      url: url,
      description,
      image: image
    }
  } catch (error) {
    console.error(error)
    return productNotFound()
  }
}

function productNotFound () {
  throw new Error('Producto no encontrado')
};
