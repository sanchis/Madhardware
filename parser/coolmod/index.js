import axios from 'axios'
import { ConfigAxios, ProductNotFound } from '../config'
import cheerio from 'cheerio'

const BASE_URL = 'https://www.coolmod.com'
const SEARCH_URL = `${BASE_URL}/web/search/bar`

export function searchProduct (text) {
  return axios.post(SEARCH_URL, `search=${text}`, ConfigAxios({ referer: BASE_URL }))
    .then(res => res.data)
    .then(data => cheerio.load(data))
    .then(dom => {
      const links = dom('.product_search_line')
      if (links?.length > 0) {
        return links.first().attr('data-url')
      }
      ProductNotFound()
    })
    .then(findByUrl)
}

function findByUrl (url) {
  if (!url || url === '') {
    return ProductNotFound()
  }

  return axios.get(`${BASE_URL}${url}`, ConfigAxios())
    .then(res => res.data)
    .then(data => populateData(data, BASE_URL + url))
}

function getDescription (idProduct) {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  return axios.post(`${BASE_URL}/web/vista-productos/getDescription`, `id=${idProduct}&is_responsive=`, ConfigAxios({ headers }))
    .then(res => res.data || '')
    .then(res => {
      if (res !== '') {
        const html = cheerio.load(res)
        return html.root().text()
      }
      return res
    })
    .catch(() => '')
}

async function populateData (html, url) {
  const page = cheerio.load(html)

  const productId = page('[name="virtuemart_product_id"]').attr('value')
  const price = page('#fixed-footer-price').text()
    .replace('€', '')
  const name = page('title').text()
  const description = await getDescription(productId)
  const image = page('#_image2').attr('data-src')
  const pn = page('.text-pn').attr('title')

  return {
    pn,
    price: parseFloat(price),
    name: name,
    url: url,
    description,
    image: image
  }
}
