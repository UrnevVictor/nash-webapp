

const API_URL = "http://localhost:5000/api" // при деплое на Render заменим

// Универсальный GET
export async function apiGet(entity) {
  const res = await fetch(`${API_URL}/${entity}`)
  return res.json()
}

// Универсальный POST
export async function apiPost(entity, data) {
  const res = await fetch(`${API_URL}/${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

// Универсальный PUT
export async function apiPut(entity, id, data) {
  const res = await fetch(`${API_URL}/${entity}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

// Универсальный DELETE
export async function apiDelete(entity, id) {
  const res = await fetch(`${API_URL}/${entity}/${id}`, {
    method: "DELETE"
  })
  return res.json()
}

// =======================
// Экспорт всех данных
// =======================
export async function exportAll() {
  const res = await fetch(`${API_URL}/export`);
  return res.json();
}

// =======================
// Импорт данных из файла
// =======================
export async function importAll(data) {
  const res = await fetch(`${API_URL}/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}