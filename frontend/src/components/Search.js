import React, { useEffect, useState } from 'react'

import MasonryLayout from './MasonryLayout'
import { client, searchQuery, getFeed } from '../client'
import Spinner from './Spinner'

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFeed = async () => {
      const results = await getFeed()
      setPins(results)
    }

    const fetchResults = async () => {
      const results = await searchQuery(searchTerm)
      setPins(results)
    }

    if (searchTerm) {
      setLoading(true)
      fetchResults(searchTerm.toLowerCase())
      setLoading(false)
    } else {
      fetchFeed()
      setLoading(false)
    }
  }, [searchTerm])

  return (
    <div>
      {loading && <Spinner message="Searching for pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found!</div>
      )}
    </div>
  )
}

export default Search
