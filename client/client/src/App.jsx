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
          <Routes></Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
