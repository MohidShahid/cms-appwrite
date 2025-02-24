import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id , title , featuredImage , $createdAt}) {

  function formatDate(isoString) {
    const date = new Date(isoString);
    // Get the day and add ordinal suffix
    const day = date.getDate();
    const ordinal = (day) => {
        if (day > 3 && day < 21) return "th"; // Covers 4th-20th
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };
    // Get month and year
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}${ordinal(day)} ${month} ${year}`;
}


  return (
    <Link to={`/post/${$id}`}>
        <div className='post-card w-full bg-gray-100 rounded-sm p-2 flex flex-col justify-evenly items-start min-h-72'>
        <div className='w-full justify-center mb-2'> 
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='' />
          <span className='text-stone-400 text-sm block pt-2'>{formatDate($createdAt)}</span>
        </div>
        <h2 className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard