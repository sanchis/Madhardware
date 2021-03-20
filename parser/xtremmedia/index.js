import axios from 'axios'
import cheerio from 'cheerio'
import { ConfigAxios, ProductNotFound } from '../config'

const BASE_URL = 'https://xtremmedia.com'
const SEARCH_URL = (text) => `${BASE_URL}/?s=product/search/...%20introduce%20palabras%20para%20buscar%20en%20T%C3%ADtulos&term=${text}`

export function searchProduct (text) {
  return axios.get(SEARCH_URL(text), ConfigAxios)
    .then(res => res.data)
    .then(data => {
      if (data?.length > 0) {
        return data[0].url
      }
      ProductNotFound()
    })
    .then(findByUrl)
}

function findByUrl (url) {
  if (!url || url === '') {
    return ProductNotFound()
  }

  return axios.get(`${url}`, ConfigAxios)
    .then(res => res.data)
    .then(data => populateData(data, url))
}

function populateData (html, url) {
  try {
    const page = cheerio.load(html)

    const image = page('.producto-portada-imagen > img').attr('src')
    const price = page('#producto-ficha-precio > strong').text().replace('€', '')
    const description = page('#producto-ficha-datostecnicos').text()
    const name = page('.producto-portada-titulo').text()

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
