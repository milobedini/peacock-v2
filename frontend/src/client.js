import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { fetchUser } from './utils/fetchUser'

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'peacock_data',
  apiVersion: '2023-09-06',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

const userDetails = fetchUser()

// API REQUESTS

export async function getUser() {
  const users = await client.fetch(
    `*[_type == "user" && _id == '${userDetails.id}']`
  )
  return users
}

export async function searchQuery(searchTerm) {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`

  const results = await client.fetch(query)

  return results
}

export async function getFeed() {
  const query = `*[_type == 'pin'] | order(_createAt desc) {
  image {
  asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
  }`
  const results = await client.fetch(query)

  return results
}

export async function getPinDetail(pinId) {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`
  const results = await client.fetch(query)

  return results
}

export async function getPinDetailMore(pin) {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`

  const results = await client.fetch(query)

  return results
}

export async function getUserCreatedPins(userId) {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`

  const results = await client.fetch(query)
  return results
}

export async function getUserSavedPins(userId) {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`

  const results = await client.fetch(query)
  return results
}
