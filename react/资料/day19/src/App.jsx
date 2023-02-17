import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import Order from './views/home/Order';
import Process from './views/home/Process';
import Mine from './views/home/Mine';
import FinishOrder from './views/home/FinishOrder';
import OrderDetail from './views/home/OrderDetail';
import Subscribe from './views/home/steps/Subscribe';
import PreCheck from './views/home/steps/PreCheck';
import Station from './views/home/steps/Station';
import BackCar from './views/home/steps/BackCar';
import Finish from './views/home/steps/Finish';
function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}>
        <Route path='/home/order' element={<Order/>}></Route>
        <Route path='/home/process' element={<Process/>}></Route>
        <Route path='/home/mine' element={<Mine/>}></Route>
        <Route path='/home/finishOrder' element={<FinishOrder/>}></Route>
        <Route path='/home/orderDetail' element={<OrderDetail/>}>
          <Route path='/home/orderDetail/subscribe' element={<Subscribe/>}></Route>
          <Route path='/home/orderDetail/preCheck' element={<PreCheck/>}></Route>
          <Route path='/home/orderDetail/station' element={<Station/>}></Route>
          <Route path='/home/orderDetail/backCar' element={<BackCar/>}></Route>
          <Route path='/home/orderDetail/finish' element={<Finish/>}></Route>
          {/* <Route path="/home/orderDetail" element={<Navigate to={"/home/orderDetail/subscribe"}/>}></Route> */}
        </Route>
        <Route path="/home" element={<Navigate to={"/home/order"}/>}></Route>
      </Route>
      <Route path="/" element={<Navigate to={"/home"}/>}></Route>
    </Routes>
  );
}

export default App;
