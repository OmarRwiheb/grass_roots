// App.jsx
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Shops from './pages/StoresPage';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';



function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stores" element={<Shops />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
