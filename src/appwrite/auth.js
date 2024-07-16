import variables from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(variables.appwriteUrl)
            .setProject(variables.appwriteProjectId)

        this.account = new Account(this.client);
        async function createAccount({ email, password, name }) {
            try {
                const userAccount = await this.account.create(ID.unique(), email, password, name);
            } catch (error) {
                throw error;
            }
            if (userAccount) {
                //call another method
                return login({ email, password })
            } else {
                return userAccount;
            }
        }
        
        async function login({ email, password }) {
            try {
                return await this.account.createEmailPasswordSession(email, password);
            } catch (error) {
                throw error;
            }
        }

        async function getCurrentUser(){
            try {
                return await this.account.get()
            } catch (error) {
                throw error;
            }
            return null;
        }

        async function logout(){
            try {
                await this.account.deleteSession('current');
            } catch (error) {
                throw error;
            }
        }
    }
};
const authService = new AuthService();

export default authService;