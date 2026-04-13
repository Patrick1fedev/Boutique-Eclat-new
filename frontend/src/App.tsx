import './App.css';
import Header from './components/Header/header.tsx';
import { Routes, Route, useLocation, } from 'react-router-dom';
import Footer from './components/Footer/Footer.tsx';
import Home from './Routes/Home/Home.tsx';
import User from './Routes/User/User.tsx';
import LogIn from './Routes/Login/Login.tsx';
import SignIn from './Routes/SignIn/SignIn.tsx';
import About from './Routes/About/About.tsx';
import Private from './components/Private/Private.tsx';
import Cart from './Routes/Cart/Cart.tsx';
import Women from './Routes/Women/Women.tsx';
import Men from './Routes/Men/Men.tsx';
import Accesories from './Routes/Accesories/Accesories.tsx';
import Store from './components/Store/Store.tsx';
import Favs from './Routes/Favs/Favs.tsx';
import { useEffect } from 'react';
import { useUser } from './Context/UserContext.tsx';
import Back from './components/back_button/Back.tsx';
import DeepViewProduct from './Routes/DeepViewProduct/DeepViewProduct.tsx';
import bgImage from './assets/icons/boutique-minimal.png';


function App() {
  const location = useLocation();
  const hideLayout = ['/auth_form', '/sign_form', '/user'].includes(location.pathname);
  const {logout} = useUser();

  useEffect(()=>{
    return logout;
  }, []);

  return (
      <div className="App">
        {!hideLayout && <Header />}
        {hideLayout&& <Back rute={'/'}/>}
        <main>
          <Routes>
            <Route path='/auth_form' element={<LogIn />} />
            <Route path='/sign_form' element={<SignIn />} />
            <Route path='/' element={<Home />} />
            <Route path='/favs' element={<Private><Favs/></Private>}/>
            <Route path='/cart' element={<Private><Cart/></Private>} />
            <Route path='/women' element={<Private><Women/></Private>} />
            <Route path='/men' element={<Private><Men/></Private>} />
            <Route path='/accessories' element={<Private><Accesories/></Private>} />
            <Route path='/about' element={<About />} />
            <Route path='/user' element={<User bgImge = {bgImage} />} />
            <Route path='/store' element={<Private><Store/></Private>}/>
            <Route path='/product/:id' element={<DeepViewProduct/>}/>
          </Routes>
        </main>
        {!hideLayout && <Footer />}
      </div>
  );
}

export default App;
