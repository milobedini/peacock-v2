import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import jwtDecode from 'jwt-decode'
import { client } from '../client'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col items-center justify-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width={'130px'} alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const user = jwtDecode(credentialResponse.credential)
                const name = user.given_name
                const email = user.email
                const imageUrl = user.picture
                localStorage.setItem(
                  'userId',
                  JSON.stringify(credentialResponse?.clientId)
                )
                localStorage.setItem('name', JSON.stringify(name))
                localStorage.setItem('email', JSON.stringify(email))
                localStorage.setItem('imageUrl', JSON.stringify(imageUrl))

                const doc = {
                  _id: credentialResponse.clientId,
                  _type: 'user',
                  userName: name,
                  image: imageUrl,
                }

                client.createIfNotExists(doc).then(() => {
                  navigate('/', { replace: true })
                })
              }}
              onError={() => {
                console.log('Login failed')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
