import React, { useState, useEffect } from 'react'
import { apiGet, apiPost, apiDelete } from '../utils/api'

function AdminVenues() {
  const [venues, setVenues] = useState([])
  const [ambassadors, setAmbassadors] = useState([])
  const [newVenue, setNewVenue] = useState({ name: '', ambassador: '' })

  useEffect(() => {
    apiGet('venues').then(setVenues)
    apiGet('ambassadors').then(setAmbassadors)
  }, [])

  const addVenue = () => {
    if (!newVenue.name.trim() || !newVenue.ambassador.trim()) return
    const item = { id: Date.now(), ...newVenue }
    apiPost('venues', item).then(() => {
      setVenues([...venues, item])
      setNewVenue({ name: '', ambassador: '' })
    })
  }

  const removeVenue = (id) => {
    apiDelete('venues', id).then(() => {
      setVenues(venues.filter(v => v.id !== id))
    })
  }

  return (
    <div className="page fade-in">
      <h2>Заведения</h2>
      <p>Добавление заведений и привязка к амбассадорам</p>

      <div className="glass-card">
        <h3 className="glass-title">Добавить заведение</h3>
        <input
          type="text"
          placeholder="Название заведения"
          value={newVenue.name}
          onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
          className="input"
        />
        <select
          value={newVenue.ambassador}
          onChange={(e) => setNewVenue({ ...newVenue, ambassador: e.target.value })}
          className="input"
        >
          <option value="">Выбери амбассадора</option>
          {ambassadors.map(a => (
            <option key={a.id} value={a.name}>{a.name}</option>
          ))}
        </select>
        <button onClick={addVenue} className="glass-button">Добавить</button>
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3 className="glass-title">Список заведений</h3>
        {venues.length === 0 ? (
          <p className="glass-subtitle">Пока нет заведений</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {venues.map(v => (
              <li key={v.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '10px 16px'
              }}>
                <span>{v.name} — <b>{v.ambassador}</b></span>
                <button
                  onClick={() => removeVenue(v.id)}
                  className="glass-button"
                  style={{ padding: '4px 12px', fontSize: '13px', background: 'rgba(255,255,255,0.15)' }}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminVenues