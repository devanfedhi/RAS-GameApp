import { useState } from 'react'
import './App.css'
import HomePage from './pages/Home/HomePage'
import ChatAppPage from './pages/ChatApp/ChatAppPage'
import CheckersPage from './pages/Checkers/CheckersPage';


import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatapp" element={<ChatAppPage/>} />
          <Route path="/checkers" element={<CheckersPage/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
