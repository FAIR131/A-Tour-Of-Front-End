import {useNavigate,useLocation} from 'react-router-dom'
export function routerHandler (Child){
    return function(){
        return <Child navigate={useNavigate()} location={useLocation()}></Child>
    }
}