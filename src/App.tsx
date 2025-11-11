import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import NasilCalisir from './pages/NasilCalisir'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/nasil-calisir" element={<NasilCalisir />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

