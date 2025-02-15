import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import ChatApp from './pages/ChatApp'
import Checkers from './pages/Checkers/Checkers';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatapp" element={<ChatApp/>} />
          <Route path="/checkers" element={<Checkers/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
