import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'

const elRoot = document.getElementById('root')
createRoot(elRoot).render(<App />)