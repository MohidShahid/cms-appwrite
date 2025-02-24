import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import PostCard from "../Components/PostCard";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setposts] = useState([]);
  const [error , setError] = useState("")
  const userData = useSelector((state) => state.auth.userData);


  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if(posts){
        setposts(posts.documents)
      }
    }).catch((error)=> setError(error.message || "Post Not Found"));
  }, []);
 
  if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">
           <div className='w-full max-w-7xl mx-auto px-4'>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                          { error || "Login to read Posts" }
                        </h1>
                    </div>
                </div>
             </div>
        </div>
    )
}
return (
    <div className='w-full py-8'>
       <div className='w-full mt-10 max-w-7xl mx-auto px-4 flex flex-col gap-4'>
         <h1 className="text-2xl font-bold ">Hello! {userData.name}</h1> 
         <span className="inline-block">Welcome Back Again</span>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
         </div>
    </div>
)
}


export default Home;
