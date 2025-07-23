import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_COUCHDB_URL,
   auth: {
    username: import.meta.env.VITE_COUCHDB_USER,
    password: import.meta.env.VITE_COUCHDB_PASS
  },
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;


