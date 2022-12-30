import Input from '../input'
import React, { useRef } from 'react'
import Button from '../button'

const Login = (props) => {
    const email = useRef();
    const password = useRef();
    return (
        <>
            <div className='w-1/2'>
                <Input type="email" text="Email" reference={email} placeholder="Enter your email" />
                <Input text="Password" reference={password} placeholder="Enter your password" type="password" />
            </div>
            <Button text="Login" onClick={e => props.handlerFn("login", email.current.value, password.current.value)} />
        </>
    )
}

export default Login
