import React, { useState, useEffect } from 'react'
import { apiGet, apiPost, apiDelete } from '../utils/api'

function AdminProducts() {
  const [lines, setLines] = useState([])
  const [newLine, setNewLine] = useState('')
  const [scents, setScents] = useState([])
  const [newScent, setNewScent] = useState({ name: '', line: '' })

  // загрузка данных
  useEffect(() => {
    apiGet('productLines').then(setLines)
    apiGet('scents').then(setScents)
  }, [])

  const addLine = () => {
    if (!newLine.trim()) return
    const item = { id: Date.now(), name: newLine }
    apiPost('productLines', item).then(() => {
      setLines([...lines, item])
      setNewLine('')
    })
  }

  const addScent = () => {
    if (!newScent.name.trim() || !newScent.line.trim()) return
    const item = { id: Date.now(), ...newScent }
    apiPost('scents', item).then(() => {
      setScents([...scents, item])
      setNewScent({ name: '', line: '' })
    })
  }

  const removeLine = (id) => {
    apiDelete('productLines', id).then(() => {
      setLines(lines.filter(l => l.id !== id))
    })
  }

  const removeScent = (id) => {
    apiDelete('scents', id).then(() => {
      setScents(scents.filter(s => s.id !== id))
    })
  }

  return (
    <div className="page fade-in">
      <h2>Линейки и ароматы</h2>
      <p>Управление ассортиментом продукции</p>

      <div className="glass-card">
        <h3 className="glass-title">Добавить линейку</h3>
        <input
          type="text"
          placeholder="Название линейки"
          value={newLine}
          onChange={(e) => setNewLine(e.target.value)}
          className="input"
        />
        <button onClick={addLine} className="glass-button">Добавить</button>
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3 className="glass-title">Добавить аромат</h3>
        <select
          value={newScent.line}
          onChange={(e) => setNewScent({ ...newScent, line: e.target.value })}
          className="input"
        >
          <option value="">Выбери линейку</option>
          {lines.map((l) => (
            <option key={l.id} value={l.name}>{l.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Название аромата"
          value={newScent.name}
          onChange={(e) => setNewScent({ ...newScent, name: e.target.value })}
          className="input"
        />
        <button onClick={addScent} className="glass-button">Добавить аромат</button>
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3 className="glass-title">Линейки</h3>
        {lines.length === 0 ? (
          <p className="glass-subtitle">Нет добавленных линеек</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {lines.map(l => (
              <li key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{l.name}</span>
                <button onClick={() => removeLine(l.id)} className="glass-button" style={{ padding: '4px 10px', fontSize: '13px' }}>Удалить</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        <h3 className="glass-title">Ароматы</h3>
        {scents.length === 0 ? (
          <p className="glass-subtitle">Нет добавленных ароматов</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {scents.map(s => (
              <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{s.line} — {s.name}</span>
                <button onClick={() => removeScent(s.id)} className="glass-button" style={{ padding: '4px 10px', fontSize: '13px' }}>Удалить</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminProducts