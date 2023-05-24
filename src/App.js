import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './pages/footer';
import Header from './pages/header';
import Blog from './pages/blog';
import Aside from './pages/aside';
import Account from './pages/account';
import Gallery from './pages/gallery';
import MainPage from './pages/main';

function App() {
  return (
    <div className="app">
      <Header />
      <Aside />
      <div className='content'>
        <MainPage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
