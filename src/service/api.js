import { create } from 'apisauce'

const api = create({
  baseURL: 'https://api-healthchain.onrender.com',
})

api.get('/enfermeiros')

export default api