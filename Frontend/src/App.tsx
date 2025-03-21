import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Catalog from './pages/Catalog';
import Contact from './pages/ContactUs';
import Login from './pages/Login';
import About from './pages/AboutUs';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
