import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import './App.css'

function App() {

  return (
    <Router>
      <div className='app'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/profile" element={ <ProfilePage />  } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
