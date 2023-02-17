import React from 'react';
import { Steps,Divider } from 'antd';
import { Switch,Route,Redirect, useRouteMatch } from 'react-router-dom'
import {connect} from 'react-redux'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import './inputCoach.css'
function InputCoach(props) {
    let match=useRouteMatch();
    return (
        <div className='input-coach'>
            <Steps
                current={props.current}
                labelPlacement="vertical"
                items={[
                    {
                        title: '基本信息'
                    },
                    {
                        title: '执教信息'
                    },
                    {
                        title: '照片信息'
                    },
                    {
                        title: '挂牌价格'
                    },
                    {
                        title: '合作价格'
                    },
                ]}
            />
            <Divider></Divider>
            <Switch>
                <Route path={`${match.path}/step1`} component={Step1}></Route>
                <Route path={`${match.path}/step2`} component={Step2}></Route>
                <Route path={`${match.path}/step3`} component={Step3}></Route>
                <Route path={`${match.path}/step4`} component={Step4}></Route>
                <Route path={`${match.path}/step5`} component={Step5}></Route>
                <Redirect to={`${match.path}/step1`}></Redirect>
            </Switch>
        </div>
    );
}

export default connect(
    (state)=>{
        return {
            current:state.currentStep
        }
    },
    ()=>{
        return {}
    }
)(InputCoach);