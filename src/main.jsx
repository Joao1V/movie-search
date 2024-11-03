import { createRoot } from 'react-dom/client'
import "bootstrap/scss/bootstrap.scss"
import 'react-toastify/dist/ReactToastify.css';


import './index.css'
import "./skeleton.scss"
import MovieSearch from "./MovieSearch.jsx";

createRoot(document.getElementById('root')).render(<MovieSearch />)
