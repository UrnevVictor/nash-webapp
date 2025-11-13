import React from 'react'

const RatingCard = ({ data }) => {
  return (
    <div className="glass-card">
      <h3 className="glass-title">Рейтинг активности</h3>
      <p className="glass-subtitle">Лучшие амбассадоры за месяц</p>

      <div className="rating-list">
        {data.map((user, index) => (
          <div key={index} className={`rating-item ${index === 0 ? 'leader' : ''}`}>
            <span className="rating-rank">{index + 1}</span>
            <span className="rating-name">{user.name}</span>
            <span className="rating-count">{user.count} заявок</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RatingCard
