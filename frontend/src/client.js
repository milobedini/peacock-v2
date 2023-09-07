import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'peacock_data',
  apiVersion: '2023-09-06',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

const userId = localStorage.getItem('userId')

// API REQUESTS

export async function getUser() {
  const users = await client.fetch(`*[_type == "user" && _id == ${userId}]`)
  return users
}
