import React from 'react'

const Button = (props) => {
    return (
        <button className={`bg-purple-500 text-white sm:p-3 p-2 rounded-xl hover:bg-purple-600 text-sm md:text-base ${props.className}`} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button
