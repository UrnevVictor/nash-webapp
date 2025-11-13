import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function BottomNav() {
  const navigate = useNavigate()

  const handleAdminClick = (e) => {
    e.preventDefault()
    const pass = prompt('Введите пароль для входа в админку:')
    if (pass === '28678720') {
      navigate('/admin')
    } else {
      alert('Неверный пароль')
    }
  }

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">🏠</NavLink>
      <NavLink to="/form" className="nav-item">📝</NavLink>
      <NavLink to="/learning" className="nav-item">📘</NavLink>
      <NavLink to="/trainings" className="nav-item">💪</NavLink>
      <NavLink to="/samples" className="nav-item">🎁</NavLink>
      <NavLink to="/rating" className="nav-item">⭐</NavLink>
      <NavLink to="/resources" className="nav-item">⚙️</NavLink>
      <a href="/admin" onClick={handleAdminClick} className="nav-item">🧠</a>
    </nav>
  )
}

export default BottomNav