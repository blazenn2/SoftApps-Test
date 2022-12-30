import React, { useRef } from 'react'
import Input from '../input'
import Button from '../button'

const Signup = (props) => {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();
    const type = useRef();

    return (
        <>
            <div className='w-1/2'>
                <Input text="Name" reference={name} placeholder="Enter your name" />
                <Input type="email" text="Email" reference={email} placeholder="Enter your email" />
                <Input type="password" text="Password" reference={password} placeholder="Enter your password" />
                <Input type="password" text="Re-Password" reference={repassword} placeholder="Re-enter your password" />
                <span className='pr-2'>Account Type</span>
                <select ref={type} className='border border-black'>
                    <option value="creator">Creator</option>
                    <option value="viewer">Viewer</option>
                </select>
            </div>
            <Button text="Sign Up" onClick={(e) => props.handlerFn("signup", name.current.value, email.current.value, password.current.value, repassword.current.value, type.current.value)} />
        </>
    )
}

export default Signup
