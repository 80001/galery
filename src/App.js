import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './pages/footer';
import Header from './pages/header';
import Blog from './pages/blog';
import Account from './pages/account';
import Galery from './pages/galery';

function App() {
  return (
    <div className="app">
      <Header />
      <div className='content'>
        <Routes>
          <Route index element={<Galery />}>
          </Route>
          <Route path='/blog' element={<Blog />}>
          </Route>
          <Route path='/account' element={<Account />}>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
