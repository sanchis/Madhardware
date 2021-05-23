import axios from 'axios'
import cheerio from 'cheerio'
import { ConfigAxios } from '../config'
import { ProductNotFoundError } from '../errors'

const BASE_URL = 'https://xtremmedia.com'
const SEARCH_DATA = (text) => `mod=product&req=global_search_post&smartsile_seal=574e60d2c4b4ba1eae2f2a11206eab7da17e43e8ce56d89cddc98a9cbcb1e5e2&_validation_list=jdSRleQ5Co81NcVGRM4eCH1e1VaD0Q%3D%3D&_validation_seal=e4d9b6ce6d8f2b9849737d0729c353c69e5cbb1ce9452e05d10bea8867f3fa89&tsearch=${text}`

export function searchProduct (text) {
  const body = SEARCH_DATA(text)
  const config = ConfigAxios({
    headers: {
      'content-length': body.length,
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
  return axios.post(BASE_URL, body, config)
    .then(res => res.data)
    .then(data => cheerio.load(data))
    .then(data => {
      const links = data('.article-list-titulo a')
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

  return axios.get(`${BASE_URL}${url.substr(1)}`, ConfigAxios())
    .then(res => res.data)
    .then(data => populateData(data, url))
}

function populateData (html, url) {
  const page = cheerio.load(html)

  const image = page('.ficha-lupa a').first().attr('href')
  const price = page('.precio').text().replace('€', '').trim()
  const description = page('#datos-deta-ficha').text()
  const name = page('[itemprop="name"]').text()

  return {
    price: parseFloat(price),
    name: name,
    url: url,
    description,
    image: image
  }
}
