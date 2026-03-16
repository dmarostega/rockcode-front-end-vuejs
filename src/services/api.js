import axios from 'axios'

const api = axios.create({
  baseURL: 'http://dev.rockcode.local/api',
})

export default api
