import React from 'react';
import {Button,message} from 'antd'
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux'
import http from '../../../utils/request'
function Step5(props) {
    let history=useHistory();
    return (
        <div>
            <Button onClick={()=>{
                props.prevStep();
                history.push("/home/input-coach/step4");
            }}>上一步</Button>
            <Button onClick={()=>{
                props.newCoach.licenses=[{}];
                props.newCoach.declareId=props.currentUser.id;
                props.newCoach.declareName=props.currentUser.nickName;

                http.post("/coach/addCoach",props.newCoach).then(res=>{
                    res.data.code?message.success(res.data.message):message.error(res.data.message)
                })
            }}>提交</Button>
        </div>
    );
}

export default connect(
    (state)=>{
        return {
            newCoach:state.newCoach,
            currentUser:state.currentUser
        }
    },
    (dispatch)=>{
        return {
            prevStep:()=>{
                dispatch({type:"PREV_STEP"})
            }
        }
    }
)(Step5);