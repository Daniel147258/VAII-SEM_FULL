
import './App.css';
import React, {useEffect} from 'react';
import Navbar from './Komponenty/Navbar/Navbar';
import PomocnyNavBar from './Komponenty/PomocnyNavBar/PomocnyNavBar'
import Menu from './Komponenty/Menu/Menu'
import Uvodna from './Strany/Uvodna/Uvodna';
import { BrowserRouter,Routes,Route } from 'react-router-dom'; 
import Kategoria from './Strany/Kategoria';
import Produkt from './Strany/Produkt';
import ZoznamOblubenych from './Strany/ZoznamOblubenych';
import Nakup from './Strany/Nakup';
import Login from './Strany/Login';
import Registracia from './Komponenty/Registracia/Registracia';
import UserInterFace from './Komponenty/UserInterFace/UserInterFace';
import ZmenaHesla from './Komponenty/ZmenaHesla/ZmenaHesla';
function App() {
  return (
    <div>
      <BrowserRouter>
        <PomocnyNavBar/>
        <Navbar/>
          <Menu/>
          <Routes>   
            <Route path='/' element={<Uvodna/>}></Route>
            <Route path='/women' element={<Kategoria category="women" />}></Route>
            <Route path='/men' element={<Kategoria category="men"/>}></Route>
            <Route path='/kid' element={<Kategoria category="kid"/>}></Route>
            <Route path=":category/:productId" element={<Produkt/>}>
            </Route>
            <Route path='/zoznamOblubenych' element={<ZoznamOblubenych/>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/nakup' element={<Nakup></Nakup>}/>
            <Route path='/registracia' element={<Registracia/>}></Route>
            <Route path='/pouzivatel' element={<UserInterFace></UserInterFace>}></Route>
            <Route path='/zmenaHesla' element={<ZmenaHesla></ZmenaHesla>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
