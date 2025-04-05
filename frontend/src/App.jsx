import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Login from './components/auth/login/Login'
import LandingPage from './components/LandingPage'
import Register from './components/auth/register/Register'
import TrackActivities from './components/TrackActivities'
import RecipeSearch from './components/RecipeSearch'
import HealthGame from './components/HealthGame'
import WellnessQuest from './components/WellnessQuest'
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/Landing" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/activities" element={<TrackActivities />} />
              <Route path="/RecipeSearch" element={<RecipeSearch />} />
              <Route path="/HealthGame" element={<HealthGame />} />
              <Route path="/WellnessQuest" element={<WellnessQuest />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
