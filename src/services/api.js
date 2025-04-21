import axios from 'axios'

const api = axios.create({
  baseUrl: 'rockcodelabs.local/',
})

export default api
