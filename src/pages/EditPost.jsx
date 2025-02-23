import React, { useEffect, useState } from 'react'
import { PostForm } from '../Components/Index'
import { useParams ,useNavigate } from 'react-router-dom'
import appwriteSerivce from '../appwrite/config'


function EditPost() {
    const {slug} = useParams()
    const navigate = useNavigate()
    const [post , setposts] = useState(null)
    
    useEffect(()=>{
        if(slug){
            appwriteSerivce.getPost(slug).then((post)=> setposts(post))
        }
        else{
            navigate('/')
        }
    },[slug, navigate])
  return post? (
    <div className='py-8'>
        <div className='w-full max-w-7xl mx-auto px-4'>
            <PostForm  post={post}/>

        </div>

    </div>
  ) : null
}

export default EditPost