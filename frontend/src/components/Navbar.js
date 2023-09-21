import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { FcGoogle } from 'react-icons/fc'
import { fetchUser } from '../utils/fetchUser'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate()

  const userInfo = fetchUser()

  // if (!userInfo.id) return null

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div
        className="flex justify-start items-center w-full px-2 rounded-md bg-white 
      border-none outline-none focus-within:shadow-sm h-14"
      >
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      {!userInfo.id && (
        <Link to={`/login`} className="p-2 rounded-lg shadow-lg mx-3">
          <FcGoogle className="w-10 h-10 rounded-full" />
          {/* <p className="text-bold text-xl">Sign In</p> */}
        </Link>
      )}

      {userInfo.id && (
        <div className="flex gap-3">
          <Link to={`user-profile/${userInfo?.id}`} className="hidden md:block">
            <img
              src={userInfo?.imageUrl}
              alt="user"
              className="w-14 h-12 rounded-lg"
            />
          </Link>
          <Link
            to={`create-pin`}
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
