import React from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()

  return (
    <div className="page fade-in">
      <h2>Административная панель</h2>
      <p>Управление данными амбассадоров и заявок</p>

      <div className="admin-grid">
        <div className="glass-card admin-card">
          <h3 className="glass-title">Амбассадоры</h3>
          <p className="glass-subtitle">Просмотр и управление участниками</p>
          <button className="glass-button" onClick={() => navigate('/admin/ambassadors')}>
            Открыть
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Линейки и ароматы</h3>
          <p className="glass-subtitle">Управление линейками и ароматами продукции</p>
          <button className="glass-button" onClick={() => navigate('/admin/products')}>
            Открыть
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Дистрибьюторы</h3>
          <p className="glass-subtitle">Добавление и управление дистрибьюторами</p>
          <button className="glass-button" onClick={() => navigate('/admin/distributors')}>
            Открыть
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Заведения</h3>
          <p className="glass-subtitle">Добавление и управление заведениями амбассадоров</p>
          <button className="glass-button" onClick={() => navigate('/admin/venues')}>
            Открыть
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Заявки</h3>
          <p className="glass-subtitle">Все заявки за текущий месяц</p>
          <button className="glass-button" onClick={() => navigate('/admin/requests')}>
            Открыть
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Рейтинг</h3>
          <p className="glass-subtitle">Обновить или сбросить статистику</p>
          <button className="glass-button">Открыть</button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Обучение</h3>
          <p className="glass-subtitle">Контент, тренинги, материалы</p>
          <button className="glass-button">Открыть</button>
        </div>
        <div className="glass-card admin-card">
          <h3 className="glass-title">Экспорт данных</h3>
          <p className="glass-subtitle">Выгрузить все данные системы (JSON)</p>
          <button
            className="glass-button"
            onClick={() => {
              const data = {
                ambassadors: JSON.parse(localStorage.getItem('ambassadors')) || [],
                productLines: JSON.parse(localStorage.getItem('productLines')) || [],
                scents: JSON.parse(localStorage.getItem('scents')) || [],
                distributors: JSON.parse(localStorage.getItem('distributors')) || [],
                venues: JSON.parse(localStorage.getItem('venues')) || [],
                requests: JSON.parse(localStorage.getItem('requests')) || []
              }
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'NASH_backup.json'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            Экспортировать
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Импорт данных</h3>
          <p className="glass-subtitle">Загрузить сохранённый JSON-файл</p>
          <button
            className="glass-button"
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'application/json'
              input.onchange = (e) => {
                const file = e.target.files[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = (event) => {
                  try {
                    const data = JSON.parse(event.target.result)
                    Object.keys(data).forEach(key => {
                      localStorage.setItem(key, JSON.stringify(data[key]))
                    })
                    alert('Данные успешно импортированы')
                  } catch (err) {
                    alert('Ошибка при чтении файла')
                  }
                }
                reader.readAsText(file)
              }
              input.click()
            }}
          >
            Импортировать
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Экспорт через сервер</h3>
          <p className="glass-subtitle">Выгрузка всех данных из backend</p>
          <button
            className="glass-button"
            onClick={async () => {
              try {
                const res = await fetch('http://localhost:5000/export', { method: 'GET' })
                const blob = await res.blob()
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'NASH_server_backup.json'
                a.click()
                URL.revokeObjectURL(url)
              } catch (e) {
                alert('Ошибка экспорта с сервера')
              }
            }}
          >
            Экспортировать с сервера
          </button>
        </div>

        <div className="glass-card admin-card">
          <h3 className="glass-title">Импорт через сервер</h3>
          <p className="glass-subtitle">Загрузить JSON и отправить в backend</p>
          <button
            className="glass-button"
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'application/json'
              input.onchange = async (e) => {
                const file = e.target.files[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = async (event) => {
                  try {
                    await fetch('http://localhost:5000/import', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: event.target.result
                    })
                    alert('Импорт на сервер выполнен')
                  } catch (err) {
                    alert('Ошибка импорта на сервер')
                  }
                }
                reader.readAsText(file)
              }
              input.click()
            }}
          >
            Импортировать на сервер
          </button>
        </div>
      </div>
    </div>
  )
}

export default Admin