import './App.css';
import { BrowserRouter, Switch, Route, NavLink,Redirect } from 'react-router-dom'
import Home from './views/Home';
import News from './views/News';
import Mine from './views/Mine';
import Cinema from './views/Cinema';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home}></Route>

        <Route path="/cinema/:useId" >
          <Cinema></Cinema>
        </Route>

        <Route path="/news" render={() => {
          return <News></News>
        }}>

        </Route>
        <Route path="/mine" >
          <Mine></Mine>
        </Route>
        
        <Redirect to="/home"></Redirect>
      </Switch>

      <ul className='tabBar'>
        <li>
          <NavLink to="/home">首页</NavLink>
        </li>
        <li>
          <NavLink to="/news">资讯</NavLink>
        </li>
        <li>
          <NavLink to="/mine">我的</NavLink>
        </li>
      </ul>
    </BrowserRouter>
  );
}

export default App;
