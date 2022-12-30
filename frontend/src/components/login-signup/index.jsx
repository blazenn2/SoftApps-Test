import React from 'react'
import Login from './login'
import Signup from './signup'

const index = (props) => {
    return (
        props.login ? <Login handlerFn={props.handlerFn} /> : <Signup handlerFn={props.handlerFn} />
    )
}

export default index
