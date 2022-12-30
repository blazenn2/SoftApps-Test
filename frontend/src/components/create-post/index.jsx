import axios from 'axios'
import React, { useRef } from 'react'
import { apiUrl } from '../../utils/util'
import Button from '../button'
import Input from '../input'
import TextArea from '../text-area'

const CreatePost = () => {
    const title = useRef();
    const description = useRef();
    const image = useRef();

    const submitHandler = () => {        
        const formData = new FormData();
        formData.append('title', title.current.value);
        formData.append('description', description.current.value);
        formData.append('image', image.current.files[0]);
        axios.post(apiUrl + "feed/post", formData, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } },).then(response => {
            // console.log(response.data);
        }).catch(err => console.error(err));
    };

    return (
        <div className='w-3/4 border border-gray-700 rounded-lg flex flex-col items-center justify-center'>
            <Input reference={title} text="Title" />
            <TextArea reference={description} text="Description" />
            <Input type="file" reference={image} text="Image" className="border-0" />
            <Button text="Submit" onClick={submitHandler} />
        </div>
    )
}

export default CreatePost
