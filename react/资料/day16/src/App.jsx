import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import Order from './views/home/Order';
import Process from './views/home/Process';
import Mine from './views/home/Mine';
function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}>
        <Route path='/home/order' element={<Order/>}></Route>
        <Route path='/home/process' element={<Process/>}></Route>
        <Route path='/home/mine' element={<Mine/>}></Route>
        <Route path="/home" element={<Navigate to={"/home/order"}/>}></Route>
      </Route>
      <Route path="/" element={<Navigate to={"/home"}/>}></Route>
    </Routes>
  );
}

export default App;
