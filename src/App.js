import './App.css';
import Footer from './pages/footer';
import Header from './pages/header';
import Aside from './pages/aside';
import MainPage from './pages/main';
import ButtonToTop from './components/Button/ButtonToTop';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthIn } from './store/user/user.action';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch(setAuthIn(user))

  }, [dispatch])

  const ref = useRef(null);

  return (
    <div className="app" ref={ref}>
      <Header />
      <Aside />
      <div className='content'>
        <MainPage />
        <ButtonToTop reffer={ref} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

// eslint-disable-next-line