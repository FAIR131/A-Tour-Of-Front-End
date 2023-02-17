import React from 'react';
import {Button} from 'antd'
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux'
function Step4(props) {
    let history=useHistory();
    return (
        <div>
            <Button onClick={()=>{
                props.prevStep();
                history.push("/home/input-coach/step3");
            }}>上一步</Button>
            <Button onClick={()=>{
                props.nextStep();
                history.push("/home/input-coach/step5");
            }}>下一步</Button>
        </div>
    );
}

export default connect(
    (state)=>{
        return {
        }
    },
    (dispatch)=>{
        return {
            nextStep:()=>{
                dispatch({type:"NEXT_STEP"})
            },
            prevStep:()=>{
                dispatch({type:"PREV_STEP"})
            }
        }
    }
)(Step4);