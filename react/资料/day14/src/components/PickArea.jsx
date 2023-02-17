import React from 'react';
import { Cascader } from 'antd';
import area from './area'
import { useState } from 'react';
import { useEffect } from 'react';
function PickArea(props) {

    let [newArea,setNewArea]=useState([])
    const onChange = (value) => {
        props.getSite(value)
    };

    useEffect(()=>{
        if(!props.showArea){
            let tempArea=JSON.parse(JSON.stringify(area))
            tempArea.forEach(item=>{
                item.children.forEach(subItem=>{
                    subItem.children=null;
                })
            })
            setNewArea(tempArea)
        }else{
            setNewArea(area)
        }
    },[])

    return (
        <>
            <Cascader options={newArea} onChange={onChange} />
        </>
    );
}

export default PickArea;