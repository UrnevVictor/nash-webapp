import React, { useEffect, useState } from 'react'

function Home() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('requests')) || []

    const map = {}

    requests.forEach(r => {
      if (!map[r.ambassador]) map[r.ambassador] = 0
      map[r.ambassador] += 1
    })

    const sorted = Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    setStats(sorted)
  }, [])

  return (
    <div className="page fade-in">
      <h2>Главная</h2>
      <p>Добро пожаловать в систему амбассадоров NAШ.</p>

      <div className="glass-card">
        <h3 className="glass-title">Амбассадор NAШ</h3>
        <p className="glass-subtitle">Твоя энергия и действия формируют бренд.</p>
        <button className="glass-button">Начать день</button>
      </div>

      <div className="glass-card">
        <h3 className="glass-title">Активность амбассадоров</h3>

        {stats.length === 0 ? (
          <p className="glass-subtitle">Пока нет заявок</p>
        ) : (
          <div style={{ width: '100%', marginTop: '20px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                  {s.name} — {s.count}
                </div>

                <div style={{
                  width: '100%',
                  height: '10px',
                  background: 'rgba(255,255,255,0.10)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      height: '10px',
                      width: '0%',
                      background: '#946B2D',
                      borderRadius: '10px',
                      animation: `growBar 1.4s ease forwards`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
