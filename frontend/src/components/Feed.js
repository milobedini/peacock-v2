import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getFeed, searchQuery } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)

  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)

    const searchCategories = async () => {
      const data = await searchQuery(categoryId)
      setPins(data)
      setLoading(false)
    }

    const fetchFeed = async () => {
      const data = await getFeed()
      setPins(data)
      setLoading(false)
    }

    if (categoryId) {
      searchCategories()
    } else {
      fetchFeed()
    }
  }, [categoryId])

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />
  return <div>{pins && <MasonryLayout pins={pins} />}</div>
}

export default Feed
