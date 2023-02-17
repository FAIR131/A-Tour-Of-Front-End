import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
const Login = lazy(() => import("./views/Login"))
const Home = lazy(() => import("./views/Home"))
function App(props) {
  let history=useHistory()
  useEffect(() => {
    let currentUser = sessionStorage.getItem("current_user");
    if (currentUser) {
      props.init_current_user(JSON.parse(currentUser))
    }else{
      history.push("/login")
    }
  }, [])

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

export default connect(() => {
  return {}
},
  (dispatch) => {
    return {
      init_current_user: (user) => {
        dispatch({ type: "INIT_CURRENT_USER", user })
      }
    }
  })(App);
