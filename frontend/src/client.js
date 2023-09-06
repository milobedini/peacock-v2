import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export default sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'peacock_data',
  apiVersion: '2023-09-06',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source)
