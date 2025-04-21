import axios from 'axios'

const api = axios.create({
  baseURL: 'http://rockcodelabs.local/api',
})

export default api
