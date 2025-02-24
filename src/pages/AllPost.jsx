import React, { useState , useEffect} from "react";
import appwriteService from "../appwrite/config";
import PostCard from "../Components/PostCard";

function AllPost() {
  const [posts, setposts] = useState([]);
  const [error , setError] = useState("")

  useEffect(()=>{
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    }).catch((error)=> setError(error.message || "Dont have Posts yet"));
  },[])

  return  (
  <div className='w-full py-8'>
     <div className='w-full max-w-7xl mx-auto px-4'>
      <h1>showing {posts.length} blog posts </h1>
        <div className="flex flex-wrap">
         {posts ? (posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'> 
                <PostCard {...post}/>
                </div>
            ))) : (error)}
          
        </div>
     </div>
  </div>
  
)
}

export default AllPost;
