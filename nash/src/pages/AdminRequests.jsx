import React, { useState, useEffect } from 'react'
import { apiGet, apiPost } from '../utils/api'

export default function AdminRequests() {
  const [ambassadors, setAmbassadors] = useState([])
  const [venues, setVenues] = useState([])
  const [productLines, setProductLines] = useState([])
  const [scents, setScents] = useState([])
  const [distributors, setDistributors] = useState([])
  const [requests, setRequests] = useState([])

  const [form, setForm] = useState({
    ambassador: '',
    venue: '',
    distributor: '',
    line: '',
    scent: '',
  })

  useEffect(() => {
    apiGet('ambassadors').then(setAmbassadors)
    apiGet('venues').then(setVenues)
    apiGet('productLines').then(setProductLines)
    apiGet('scents').then(setScents)
    apiGet('distributors').then(setDistributors)
    apiGet('requests').then(setRequests)
  }, [])

  const submitRequest = () => {
    const item = { id: Date.now(), ...form }
    apiPost('requests', item).then(() => {
      setRequests([...requests, item])
      setForm({ ambassador: '', venue: '', distributor: '', line: '', scent: '' })
    })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Создать заявку</h2>

      <select value={form.ambassador} onChange={e=>setForm({...form, ambassador:e.target.value})}>
        <option value="">Амбассадор</option>
        {ambassadors.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <select value={form.venue} onChange={e=>setForm({...form, venue:e.target.value})}>
        <option value="">Заведение</option>
        {venues
          .filter(v => v.ambassador === form.ambassador)
          .map(v => <option key={v.id} value={v.id}>{v.name}</option>)
        }
      </select>

      <select value={form.line} onChange={e=>setForm({...form, line:e.target.value})}>
        <option value="">Линейка</option>
        {productLines.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}
      </select>

      <select value={form.scent} onChange={e=>setForm({...form, scent:e.target.value})}>
        <option value="">Аромат</option>
        {scents
          .filter(s => s.line === form.line)
          .map(s => <option key={s.id} value={s.id}>{s.name}</option>)
        }
      </select>

      <select value={form.distributor} onChange={e=>setForm({...form, distributor:e.target.value})}>
        <option value="">Дистрибьютор</option>
        {distributors.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <button onClick={submitRequest}>Отправить заявку</button>

      <h3 style={{ marginTop: 30 }}>Все заявки</h3>
      {requests.map(r=>(
        <div key={r.id} style={{ marginBottom: 10, background:'#2225', padding:10, borderRadius:8 }}>
          <div>Амбассадор: {r.ambassador}</div>
          <div>Заведение: {r.venue}</div>
          <div>Линейка: {r.line}</div>
          <div>Аромат: {r.scent}</div>
          <div>Дистрибьютор: {r.distributor}</div>
        </div>
      ))}
    </div>
  )
}