import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Form from './pages/Form.jsx'
import Rating from './pages/Rating.jsx'
import Learning from './pages/Learning.jsx'
import Trainings from './pages/Trainings.jsx'
import Samples from './pages/Samples.jsx'
import Resources from './pages/Resources.jsx'
import Admin from './pages/Admin.jsx'
import AdminAmbassadors from './pages/AdminAmbassadors.jsx'
import AdminProducts from './pages/AdminProducts.jsx'
import AdminDistributors from './pages/AdminDistributors.jsx'
import AdminVenues from './pages/AdminVenues.jsx'
import BottomNav from './components/BottomNav.jsx'
import Header from './components/Header.jsx'
import './style.css'

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand()
    }
  }, [])

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/ambassadors" element={<AdminAmbassadors />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/distributors" element={<AdminDistributors />} />
          <Route path="/admin/venues" element={<AdminVenues />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
