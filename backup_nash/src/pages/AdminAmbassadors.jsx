import React, { useState, useEffect } from 'react'
import { apiGet, apiPost, apiDelete } from '../utils/api'

function AdminAmbassadors() {
  const [ambassadors, setAmbassadors] = useState([])
  const [newAmbassador, setNewAmbassador] = useState('')

  // загрузка сохранённых данных
  useEffect(() => {
    apiGet('ambassadors').then(setAmbassadors)
  }, [])

  const addAmbassador = () => {
    if (!newAmbassador.trim()) return
    const item = { id: Date.now(), name: newAmbassador }
    apiPost('ambassadors', item).then(() => {
      setAmbassadors([...ambassadors, item])
      setNewAmbassador('')
    })
  }

  const removeAmbassador = (id) => {
    apiDelete('ambassadors', id).then(() => {
      setAmbassadors(ambassadors.filter(a => a.id !== id))
    })
  }

  return (
    <div className="page fade-in">
      <h2>Амбассадоры</h2>
      <p>Добавление и управление списком амбассадоров</p>

      <div className="glass-card">
        <input
          type="text"
          placeholder="Имя амбассадора"
          value={newAmbassador}
          onChange={(e) => setNewAmbassador(e.target.value)}
          className="input"
        />
        <button onClick={addAmbassador} className="glass-button">
          Добавить
        </button>
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3 className="glass-title">Список</h3>
        {ambassadors.length === 0 ? (
          <p className="glass-subtitle">Пока никого нет</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {ambassadors.map((a) => (
              <li
                key={a.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '10px 16px'
                }}
              >
                <span>{a.name}</span>
                <button
                  onClick={() => removeAmbassador(a.id)}
                  className="glass-button"
                  style={{
                    padding: '4px 12px',
                    fontSize: '13px',
                    background: 'rgba(255,255,255,0.15)'
                  }}
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

export default AdminAmbassadors