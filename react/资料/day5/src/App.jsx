import './App.css';
import { BrowserRouter, Link, Switch, Route, Redirect,NavLink } from 'react-router-dom'
import Film from './views/Film';
import Cinema from './views/Cinema';
import News from './views/News';
import NoMatch from './views/NoMatch';
import Mine from './views/Mine';
import TabBar from './components/TabBar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* 路由的三种渲染方式 */}
          <Route path='/film'>
            <Film></Film>
          </Route>
          {/* 通过路由component方式渲染的页面,props中有路由对象,其他渲染方式的页面需要借助withRouter高阶组件获取路由对象 */}
          <Route path='/cinema' component={Cinema}></Route>
          <Route path='/news' render={() => {
            return <News></News>
          }}></Route>
          <Route path='/mine' component={Mine}></Route>
          {/* exact是精确匹配 */}
          <Redirect from="/" exact to="/film"></Redirect>
          <Route component={NoMatch}></Route>
        </Switch>

        <TabBar></TabBar>
      </BrowserRouter>

    </div>
  );
}

export default App;
