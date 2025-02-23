import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client;
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
     try {
        const userAccount = await this.account.create(ID.unique(), email,password,name)
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
}

   

const authService = new AuthService();
export default authService;
