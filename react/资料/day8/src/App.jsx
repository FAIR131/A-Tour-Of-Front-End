import './App.css';
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import Film from './views/Film';
// import Cinema from './views/Cinema';
// import News from './views/News';
// import NoMatch from './views/NoMatch';
// import Mine from './views/Mine';
// import TabBar from './components/TabBar';
import HotFilm from './views/film/HotFilm';
import NewFilm from './views/film/NewFilm';
const Film = lazy(() => import("./views/Film"));
const Cinema = lazy(() => import("./views/Cinema"));
const News = lazy(() => import("./views/News"));
const NoMatch = lazy(() => import("./views/NoMatch"));
const Mine = lazy(() => import("./views/Mine"));
const TabBar = lazy(() => import("./components/TabBar"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 组件做了懒加载后,必须用suspense处理页面悬停状态 */}
        <Suspense fallback={<div>加载中...</div>}>
          <Routes>
            {/* 路由的三种渲染方式 */}
            {/* 当一个页面有子路由时,此页面不能设置路由精确匹配 */}
            <Route path='/film' element={<Film></Film>}>
              <Route path='/film/hotFilm' element={<HotFilm />}></Route>
              <Route path='/film/newFilm' element={<NewFilm />}></Route>
              {/* <Redirect to="/film/hotFilm"></Redirect> */}
              <Route path='/film' element={<Navigate exact to="/film/hotFilm" />}></Route>
            </Route>
            {/* 通过路由component方式渲染的页面,props中有路由对象,其他渲染方式的页面需要借助withRouter高阶组件获取路由对象 */}
            <Route path='/cinema/:userId' element={<Cinema />}></Route>
            {/* <Route path='/news' render={() => {
              // render渲染方式用于实现路由鉴权
              if (sessionStorage.getItem("currentUser")) {
                return <News></News>
              } else {
                return <NoMatch></NoMatch>
              }
            }}></Route> */}
            <Route path='/news' element={<News></News>}>
              
            </Route>
            <Route path='/mine' element={<Mine />}></Route>
            {/* exact是精确匹配 */}
            {/* <Redirect from="/" exact to="/film"></Redirect> */}
            <Route path='/' element={<Navigate exact to="/film" />}></Route>
            <Route element={<NoMatch />}></Route>
          </Routes>

          <TabBar></TabBar>
        </Suspense>
      </BrowserRouter>

    </div>
  );
}

export default App;
