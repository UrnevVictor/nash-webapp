import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

function Reconciliation() {
  const [requests, setRequests] = useState([])
  const [selectedDist, setSelectedDist] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('requests')) || []
    setRequests(saved)
  }, [])

  const toggleStatus = (id, newStatus) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    )
    setRequests(updated)
    localStorage.setItem('requests', JSON.stringify(updated))
  }

  const exportReconciliation = () => {
    const filtered = requests.filter(r =>
      !selectedDist || r.distributor === selectedDist
    )

    if (filtered.length === 0) {
      alert('Нет заявок для выгрузки')
      return
    }

    const data = filtered.map(r => ({
      Амбассадор: r.ambassador,
      Заведение: r.venue,
      Линейка: r.line,
      Аромат: r.scent,
      Дистрибьютор: r.distributor,
      Статус: r.status || 'в ожидании',
      Комментарий: r.comment || '',
      Дата: r.date
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Сверка')

    const filename = selectedDist
      ? `Сверка_${selectedDist}.xlsx`
      : 'Сверка_всех_дистрибьюторов.xlsx'

    XLSX.writeFile(workbook, filename)
  }

  return (
    <div className="page fade-in">
      <h2>Сверка заявок</h2>
      <p>Отметь, какие заявки были отгружены</p>

      {/* Analytics summary */}
      <div
        className="glass-card"
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          textAlign: 'left'
        }}
      >
        <h3 className="glass-title">Сводка</h3>

        <p><b>Всего заявок:</b> {requests.length}</p>
        <p>
          <b>Отгружено:</b>{' '}
          {requests.filter(r => r.status === 'Отгружено').length}
        </p>
        <p>
          <b>Не отгружено:</b>{' '}
          {requests.filter(r => r.status === 'Не отгружено').length}
        </p>
        <p>
          <b>Процент отгрузки:</b>{' '}
          {requests.length > 0
            ? Math.round(
                (requests.filter(r => r.status === 'Отгружено').length /
                  requests.length) * 100
              ) + '%'
            : '—'}
        </p>
      </div>

      {/* Analytics by ambassadors */}
      <div
        className="glass-card"
        style={{
          marginTop: '10px',
          marginBottom: '20px',
          textAlign: 'left'
        }}
      >
        <h3 className="glass-title">По амбассадорам</h3>

        {Object.entries(
          requests.reduce((acc, r) => {
            if (!acc[r.ambassador]) {
              acc[r.ambassador] = { total: 0, delivered: 0, notDelivered: 0 }
            }
            acc[r.ambassador].total += 1
            if (r.status === 'Отгружено') acc[r.ambassador].delivered += 1
            if (r.status === 'Не отгружено') acc[r.ambassador].notDelivered += 1
            return acc
          }, {})
        ).map(([name, stats]) => (
          <div key={name} style={{ marginBottom: '12px' }}>
            <p><b>{name}</b></p>
            <p>Всего: {stats.total}</p>
            <p>Отгружено: {stats.delivered}</p>
            <p>Не отгружено: {stats.notDelivered}</p>
            <p>
              Процент:{" "}
              {stats.total > 0
                ? Math.round((stats.delivered / stats.total) * 100) + "%"
                : "—"}
            </p>
            <hr style={{ opacity: 0.2 }} />
          </div>
        ))}
      </div>

      <select
        value={selectedDist}
        onChange={(e) => setSelectedDist(e.target.value)}
        className="input"
        style={{ marginBottom: '20px', marginTop: '10px' }}
      >
        <option value="">Все дистрибьюторы</option>
        {Array.from(new Set(requests.map(r => r.distributor))).map((d, i) => (
          <option key={i} value={d}>{d}</option>
        ))}
      </select>

      <div className="glass-card">
        <button className="glass-button" onClick={exportReconciliation}>
          📤 Выгрузить Excel
        </button>
      </div>

      <div className="glass-card" style={{ marginTop: '20px' }}>
        {requests
          .filter(r => !selectedDist || r.distributor === selectedDist)
          .map((r) => (
            <div
              key={r.id}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '12px',
                marginBottom: '12px',
                padding: '12px 16px'
              }}
            >
              <p><b>Амбассадор:</b> {r.ambassador}</p>
              <p><b>Заведение:</b> {r.venue}</p>
              <p><b>Аромат:</b> {r.scent}</p>
              <p><b>Дистрибьютор:</b> {r.distributor}</p>
              <p><b>Статус:</b> {r.status || 'в ожидании'}</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  className="glass-button"
                  onClick={() => toggleStatus(r.id, 'Отгружено')}
                >
                  ✅ Отгружено
                </button>
                <button
                  className="glass-button"
                  onClick={() => toggleStatus(r.id, 'Не отгружено')}
                  style={{ background: 'rgba(255,0,0,0.2)' }}
                >
                  ❌ Не отгружено
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Reconciliation
