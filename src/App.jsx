import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom";
import Shops from './pages/StoresPage';

function App() {
  return (
    <>
      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/stores" element={<Shops />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
