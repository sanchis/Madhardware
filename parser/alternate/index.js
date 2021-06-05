import axios from 'axios'
import cheerio from 'cheerio'
import { ConfigAxios } from '../config'
import { ProductNotFoundError } from '../errors'

const BASE_URL = 'https://www.alternate.es'
const SEARCH_URL = `${BASE_URL}/mobile/listing.xhtml`

export async function searchProduct (text) {
  const data = (state) => `lazyForm=lazyForm&q=${encodeURI(text)}&lazyComponent=lazyListingContainer&javax.faces.ViewState=${state}&javax.faces.source=lazyButton&javax.faces.partial.event=click&javax.faces.partial.execute=lazyButton%20lazyButton&javax.faces.behavior.event=action&javax.faces.partial.ajax=true`

  const newConfig = (cookie) => ConfigAxios({
    withCredentials: true,
    headers: {
      Cookie: cookie,
      Accept: '*/*',
      Connection: 'keep-alive',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Faces-Request': 'partial/ajax'
    }
  })

  const cookie = await axios.post(SEARCH_URL, data(null), newConfig(null)).then(data => data.headers['set-cookie'].join(';'))
  const state = await axios.post(SEARCH_URL, data(null), newConfig(cookie))
    .then(content => {
      const regx = /\[-?\d*:-?\d*\]/gm
      const regexExec = regx.exec(content.data)
      if (regexExec[0]) {
        return regexExec[0].substr(1, regexExec[0].indexOf(']') - 1)
      }
      return null
    })
  return axios.post(SEARCH_URL, data(state), newConfig(cookie))
    .then(res => res.data)
    .then(data => cheerio.load(data))
    .then(data => {
      const links = data('.productBox')
      if (links?.length > 0) {
        return links.first().attr('href')
      }
      throw new ProductNotFoundError()
    })
    .then(findByUrl)
}

function findByUrl (url) {
  if (!url || url === '') {
    throw new ProductNotFoundError()
  }

  return axios.get(`${url}`, ConfigAxios())
    .then(res => res.data)
    .then(populateData)
}

function populateData (html) {
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
}
