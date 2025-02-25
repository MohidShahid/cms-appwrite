import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import PostCard from "../Components/PostCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImg from "../assets/Images/user.png";
import authService from "../appwrite/auth";
function Home() {
  const [posts, setposts] = useState([]);
  const [error, setError] = useState("");
  const [imgUrl, setImgUrl] = useState(userImg);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const handleProfileImg = () => {
    navigate("/profileUpload");
  };

  useEffect(() => {
    async function fetchProfileImage() {
      const profileId = await authService.getProfileId(); // ✅ Await the async function
      console.log(profileId);
      if (profileId) {
        const imgLink = appwriteService.getFilePreview(profileId);
        setImgUrl(imgLink);
      } else {
        setImgUrl(userImg);
      }
    }
    fetchProfileImage(); // ✅ Call the function inside useEffect
  }, []);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setposts(posts.documents);
        }
      })
      .catch((error) => setError(error.message || "Post Not Found"));
  }, [userData]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {error || "Login to read Posts"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <div className="w-full mt-10 max-w-7xl mx-auto px-4 flex flex-col gap-4">
        <div className="welcome-wrapper flex gap-7 items-start justify-start">
          <div className="text-wrapper">
            <h1 className="text-2xl font-bold ">Hello! {userData.name}</h1>
            <span className="inline-block">Welcome Back Again</span>
          </div>
          <div className="profile-wrapper flex flex-col w-auto h-auto">
            <div className="img w-16 h-auto cursor-pointer">
              <img
                src={imgUrl}
                className="rounded-full border"
                alt="user.png"
                onClick={handleProfileImg}
              />
            </div>
            <div className="profile-menu bg-white p-2 rounded-xl ">
              <ul className="list-items">
                <li>
                  <Link to="/profileUpload">Upload Profile Image</Link>
                </li>
                <li>
                  <Link to="/change-password">Change Password</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
