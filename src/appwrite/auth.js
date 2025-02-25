import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";
import service from './config.js';

export class AuthService{
    client = new Client;
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
     try {
        const userAccount = await this.account.create(ID.unique(), email,password,name);
        if(userAccount){
            return this.login({email,password})
        }
        else{
            return userAccount
        }
     } catch (error) {
        throw error
     }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error);
        }
        return null
    }

    async logout(sessionId){
        try {
            await this.account.deleteSession(sessionId)
        } catch (error) {
            console.log("Appwrite service :: logout() :: ", error);
        }
    }

    async getCurrentSession (){
        try {
          return  await this.account.getSession("current");
          
        } catch (error) {
            console.log("Appwrite Service :: getCurrentSession", error)
        }
    }

    async uploadProfileImg(profileImg) {
        try {
            console.log("Uploading Image:", profileImg);
            const imgId = await service.uploadFile(profileImg);
            console.log("Uploaded Image ID:", imgId.$id);
    
            await this.account.updatePrefs({ profilepic: imgId.$id });
    
            console.log("Updated Prefs with New ProfilePic ID:", imgId.$id);
            return imgId.$id;  // ✅ Ensure returning new profile ID
        } catch (error) {
            console.error("UploadProfileImg Error:", error);
            return null; // Handle failure properly
        }
    }
    
    async deleteProfileImg() {
        try {
            await this.account.updatePrefs({ profilepic: null });
            console.log("Profile image removed successfully");

            // ✅ Fetch prefs again to confirm deletion
            const updatedPrefs = await this.account.getPrefs();
            console.log("Updated Prefs After Deletion:", updatedPrefs);
        } catch (error) {
            console.error("DeleteProfileImg Error:", error);
        }
    }
    async getProfileId(){
       const {profilepic} = await this.account.getPrefs();
       console.log(profilepic)
       return profilepic;
    }
    async changePassword (newPass , oldPass){
       const result =  await this.account.updatePassword(newPass , oldPass);
       console.log(result)
    }
}

   

const authService = new AuthService();
export default authService;
