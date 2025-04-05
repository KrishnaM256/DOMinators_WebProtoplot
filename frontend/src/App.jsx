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
import ChatBot from './components/ChatBot'
import MotivationalNotifier from './components/MotivationalNotifier'
import { ToastContainer } from 'react-toastify' // <-- Add this import with other imports
import 'react-toastify/dist/ReactToastify.css' // <-- Also add the CSS import

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
              <Route path="/nutrition" element={<RecipeSearch />} />
              <Route path="/RecipeSearch" element={<RecipeSearch />} />
              <Route path="/HealthGame" element={<HealthGame />} />
              <Route path="/games" element={<WellnessQuest />} />
              <Route path="/Ai_Help" element={<ChatBot />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
