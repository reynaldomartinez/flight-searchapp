import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchResults from './pages/SearchResults';
import SearchResultdetail from './pages/SearchResultDetail';
import './App.css';


function App() {
  return (
    <div className="App flex flex-col h-screen justify-between bg-slate-50">
      <header className="App-header">
        <Navbar />
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='search-results'  element={<SearchResults />} />
        <Route path='/search-results/:id' element={<SearchResultdetail />} />
        <Route path='contact' element={<Contact />} />

        {/* MUST BE LOGGED IN  */}
        <Route path='dashboard' element={<Dashboard />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route 
          path='*'
          element={
            <NotFound />
          }
        />
      </Routes>
      
      <Footer />  
    </div>
    );
}

export default App;


