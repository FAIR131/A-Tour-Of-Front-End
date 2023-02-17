import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
const Login = lazy(() => import("./views/Login"))
const Home = lazy(() => import("./views/Home"))
function App() {
  return (
    <Suspense fallback={<LoadingOutlined />}>
      <Switch>
        <Route path={"/login"} component={Login}></Route>
        <Route path={"/home"} component={Home}></Route>
        <Redirect to={"/login"}></Redirect>
      </Switch>
    </Suspense>
  );
}

export default App;
