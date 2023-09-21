import React, { useEffect, useRef, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import Sidebar from '../components/Sidebar'
import { Link, Route, Routes } from 'react-router-dom'
import logo from '../assets/logo.png'
import { getUser } from '../client'
import UserProfile from '../components/UserProfile'
import Pins from './Pins'
import { IoLogoGoogle } from 'react-icons/io'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)

  let userId = localStorage.getItem('userId')

  useEffect(() => {
    userId = localStorage.getItem('userId')
    if (userId) {
      const getUserList = async () => {
        const users = await getUser()
        setUser(users[0])
      }
      getUserList()
    }
  }, [userId])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {userId ? (
            <Link to={userId && `user-profile/${userId}`}>
              {user?.image && (
                <img src={user?.image} alt="logo" className="w-28" />
              )}
            </Link>
          ) : (
            <Link to={`/login`}>
              <IoLogoGoogle className="w-10 h-10 rounded-full text-red-600" />
            </Link>
          )}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route
            path="/*"
            element={<Pins user={user && user} />}
            user={user && user}
          />
        </Routes>
      </div>
    </div>
  )
}

export default Home
