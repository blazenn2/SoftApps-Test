import React from 'react'
import { apiUrl } from '../../utils/util'

const Post = (props) => {
    return (
        <div className='border border-gray-600 rounded-lg w-full p-3'>
            <p><span className='font-semibold'>Title:</span> {props.title}</p>
            <p><span className='font-semibold'>Description:</span> {props.description}</p>
            <img src={apiUrl + props.image} />
        </div>
    )
}

export default Post
