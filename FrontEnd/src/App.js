
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
import PridajProduktLook from './Komponenty/PridajProduktLook/PridajProdukt';
import UpravProdukt from './Komponenty/UpravProdukt/UpravProdukt';
import ChangeProdukt from './Komponenty/ChangeProdukt/ChangeProdukt';

function App() {
  return (
    <div>
      <BrowserRouter>
        <PomocnyNavBar/>
        <Navbar/>
          <Menu/>
          <Routes>   
            <Route path='/' element={<Uvodna/>}></Route>
            <Route path='/:pohlavie' element={<Kategoria/>}></Route>
            <Route path='/0/:kategoria' element={<Kategoria/>}></Route>
            <Route path='/:pohlavie/:kategoria' element={<Kategoria/>}></Route>
            <Route path='/:pohlavie/:kategoria/:productId' element={<Produkt/>}></Route>
            <Route path='/zoznamOblubenych' element={<ZoznamOblubenych/>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/nakup' element={<Nakup></Nakup>}/>
            <Route path='/registracia' element={<Registracia/>}></Route>
            <Route path='/pouzivatel' element={<UserInterFace></UserInterFace>}></Route>
            <Route path='/zmenaHesla' element={<ZmenaHesla></ZmenaHesla>}></Route>
            <Route path='/pridajProdukt' element={<PridajProduktLook></PridajProduktLook>}></Route>
            <Route path='/upravProdukt' element={<UpravProdukt></UpravProdukt>}></Route>
            <Route path="/upravProdukt/:id" element={<ChangeProdukt />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
