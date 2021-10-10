import React from 'react'
import {Redirect} from 'react-router-dom';

export default function landing() {
    return (
        <Redirect to='/login'/>
    )
}
