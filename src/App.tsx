import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import PlanetList from './components/PlanetList'

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/planets" className="navbar-brand">
          Title
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/planets'} className="nav-link">
              Planets
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PlanetList/>} />
          <Route path="/planets" element={<PlanetList/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
