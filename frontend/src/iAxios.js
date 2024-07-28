import axios from "axios";

const iAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 20000,
  // headers: {'X-Custom-Header': 'custom'}
});


export default iAxios