import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './container/Home'
import { Buffer } from 'buffer'

global.Buffer = Buffer

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App
