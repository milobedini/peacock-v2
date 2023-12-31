import React, { useEffect } from 'react'
import { RiHomeFill } from 'react-icons/ri'

import logo from '../assets/peacock.png'
import { Link, NavLink } from 'react-router-dom'
import { fetchUser } from '../utils/fetchUser'
import { categories } from '../utils/constants'
import { FcGoogle } from 'react-icons/fc'

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  const userInfo = fetchUser()

  let userId = localStorage.getItem('userId')

  useEffect(() => {
    userId = localStorage.getItem('userId')
  }, [userId])

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((cat) => (
            <NavLink
              to={`/category/${cat.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={cat.name}
            >
              <img
                src={cat.image}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="category"
              />
              {cat.name}
            </NavLink>
          ))}
        </div>
      </div>
      {userInfo?.id && userId && (
        <Link
          to={`user-profile/${userInfo.id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={`${userInfo?.imageUrl}`}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{userInfo.name}</p>
        </Link>
      )}
      {(!userInfo.id || !userId) && (
        <Link
          to={`/login`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <FcGoogle className="w-10 h-10 rounded-full" />
          <p className="text-bold text-xl">Sign In</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
