import React from 'react'

const TextArea = (props) => {
    return (
        <label className='flex items-center md:space-x-4 space-x-2 w-full md:p-2 p-1'>
            <span className="cursor-pointer flex grow">{props.text}</span>
            <textarea className='w-full border border-slate-400 focus:outline-none focus:border-slate-400 disabled:bg-gray-100 hover:bg-slate-100 p-1.5 px-5 rounded-md' ref={props.reference} {...props} />
        </label>
    )
}

export default TextArea
