import axios from 'axios'
import cheerio from 'cheerio'
import { ConfigAxios, ProductNotFound } from '../config'

const BASE_URL = 'https://www.alternate.es'
const SEARCH_URL = `${BASE_URL}/mobile/listing.xhtml`

export function searchProduct (text) {
  const data = `lazyForm=lazyForm&q=${encodeURI(text)}&lazyComponent=lazyListingContainer&javax.faces.ViewState=stateless&javax.faces.source=lazyButton&javax.faces.partial.event=click&javax.faces.partial.execute=lazyButton%20lazyButton&javax.faces.behavior.event=action&javax.faces.partial.ajax=true`

  const newConfig = (cookie) => ({
    withCredentials: true,
    headers: {
      ...ConfigAxios.headers,
      Cookie: cookie,
      Accept: '*/*',
      Connection: 'keep-alive',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Faces-Request': 'partial/ajax'
    }
  })

  const requestAlternate = (cookie) => axios.post(SEARCH_URL, data, newConfig(cookie))
  return requestAlternate(null)
    .then(data => data.headers['set-cookie'] ? requestAlternate(data.headers['set-cookie'].join(';')) : data)
    .then(res => res.data)
    .then(data => cheerio.load(data))
    .then(data => {
      const links = data('.productBox')
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

  return axios.get(`${url}`, ConfigAxios)
    .then(res => res.data)
    .then(populateData)
}

function populateData (html) {
  try {
    const page = cheerio.load(html)

    const url = page('[rel="canonical"]').attr('href')
    const image = page('[itemprop="image"]').attr('content')
    const price = page('[itemprop="price"]').attr('content')
    const description = page('[itemprop="description"]').text()
    const name = page('#product-name-data').attr('data-product-name')

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
