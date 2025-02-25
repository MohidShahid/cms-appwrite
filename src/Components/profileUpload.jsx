import React, { useState } from "react";
import { useForm } from "react-hook-form"; // ✅ Import useForm
import Input from "../Components/Input";
import AuthService from "../appwrite/auth";
import appwriteService from "../appwrite/config"

function ProfileUpload() {
    const [info , setInfo] = useState("");
  const { register, handleSubmit } = useForm(); // ✅ Initialize register

  const profileId = AuthService.getProfileId();


const onSubmit = async (data) => {
  try {
      const profileId = await AuthService.getProfileId(); // ✅ Await getProfileId()
      
      if (profileId) {
          await appwriteService.deleteFile(profileId);
          await AuthService.deleteProfileImg();
          await AuthService.uploadProfileImg(data.profileImg[0]);
          setInfo("Profile picture removed and updated successfully");
      } else {
          await AuthService.uploadProfileImg(data.profileImg[0]); // ✅ Get new ID
          setInfo("Uploaded Successfully");
      }
  } catch (error) {
      console.error("Error in onSubmit:", error);
      setInfo("Error occurred!");
  }
};
    
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1>Upload Profile Picture</h1>
      <form className="flex flex-col gap-4 w-9/12" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Profile Image"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="file"
          {...register("profileImg", {
            required: true,
          })}
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          {profileId ? "Update Image" : "Upload Image"}
        </button>
      </form>
      <small className="text-green-950 text-md">{info}</small>
    </div>
  );
}

export default ProfileUpload;
