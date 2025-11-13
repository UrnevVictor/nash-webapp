

import React, { useState, useEffect } from 'react'
import { apiGet, apiPost, apiDelete } from '../utils/api'

function AdminDistributors() {
  const [distributors, setDistributors] = useState([])
  const [newDistributor, setNewDistributor] = useState('')

  useEffect(() => {
    apiGet('distributors').then(setDistributors)
  }, [])

  const addDistributor = () => {
    if (!newDistributor.trim()) return
    const item = { id: Date.now(), name: newDistributor }
    apiPost('distributors', item).then(() => {
      setDistributors([...distributors, item])
      setNewDistributor('')
    })
  }

  const removeDistributor = (id) => {
    apiDelete('distributors', id).then(() => {
      setDistributors(distributors.filter(d => d.id !== id))
    })
  }

  return (
    <div className="page fade-in">
      <h2>Дистрибьюторы</h2>
      <p>Добавление и управление дистрибьюторами</p>

      <div className="glass-card">
        <input
          type="text"
          placeholder="Название дистрибьютора"
          value={newDistributor}
          onChange={(e) => setNewDistributor(e.target.value)}
          className="input"
        />
        <button onClick={addDistributor} className="glass-button">Добавить</button>
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3 className="glass-title">Список дистрибьюторов</h3>
        {distributors.length === 0 ? (
          <p className="glass-subtitle">Пока пусто</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {distributors.map((d) => (
              <li
                key={d.id}
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
                <span>{d.name}</span>
                <button
                  onClick={() => removeDistributor(d.id)}
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

export default AdminDistributors