
import './App.css';
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <PomocnyNavBar/>
        <Navbar/>
        <Menu/>
          <Routes>   
            <Route path='/' element={<Uvodna/>}></Route>
            <Route path='/zeny' element={<Kategoria category="women" />}></Route>
            <Route path='/muzi' element={<Kategoria category="men"/>}></Route>
            <Route path='/deti' element={<Kategoria category="kid"/>}></Route>
            <Route path="produkt" element={<Produkt/>}>
              <Route path=':produktId' element={<Produkt></Produkt>}></Route>
            </Route>
            <Route path='/zoznamOblubenych' element={<ZoznamOblubenych/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/nakup' element={<Nakup></Nakup>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
