import './App.css';
import Footer from './pages/footer';
import Header from './pages/header';
import Aside from './pages/aside';
import MainPage from './pages/main';
import ButtonToTop from './components/Button/ButtonToTop';

function App() {
  return (
    <div className="app">
      <Header />
      <Aside />
      <div className='content'>
        <MainPage />
        <ButtonToTop />
      </div>
      <Footer />
    </div>
  );
}

export default App;
