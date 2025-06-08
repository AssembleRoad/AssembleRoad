import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ForBusinesses from './components/ForBusinesses';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LegalNotice from './components/legal/LegalNotice';
import Privacy from './components/legal/Privacy';
import Terms from './components/legal/Terms';


function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ForBusinesses />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router basename="/AssembleRoad/">
      <div className="min-h-screen bg-white text-gray-800 font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mentions-legales" element={<LegalNotice />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="/cgu" element={<Terms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;