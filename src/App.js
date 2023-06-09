import './App.css';
import Footer from './pages/footer';
import Header from './pages/header';
import Aside from './pages/aside';
import MainPage from './pages/main';
import ButtonToTop from './components/Button/ButtonToTop';
import { useEffect } from 'react';
import { setUser, setUserName } from './store/user/user.action';
import { useDispatch } from 'react-redux';

function App() {
  const savedUser = localStorage.getItem('user')
  const dispatch = useDispatch()
  useEffect(() => {
    if (savedUser) {
      const user = JSON.parse(savedUser)
      console.log(user)
      dispatch(setUser(user))
      dispatch(setUserName(user.displayName))
    } else {
      console.log('There is no log')
    }
  }, [])
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
