import React from 'react';
import {useLocation,useParams} from 'react-router-dom'
function Cinema(props) {
    // let location=useLocation()
    let params=useParams()
    console.log(params);
    return (
        <div>
            影院
        </div>
    );
}

export default Cinema;