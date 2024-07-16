import variables from "../conf/conf";

import { Client, ID, Databases, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);


        async function createPost({ title, slug, content, featuredImage, userId, status, status }) {
            try {
                return await this.databases.createDocument(
                    variables.appwriteDatabaseId,
                    variables.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        userId,
                        status,
                    }
                )
            } catch (error) {
                throw error
            }
        }
        async function updatePost(slug, { title, content, status, featuredImage }) {
            try {
                return await this.databases.updateDocument(
                    variables.appwriteDatabaseId,
                    variables.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        status,
                        featuredImage,
                    }
                )
            } catch (error) {
                throw error;
            }
        }

        async function deletePost(slug) {
            try {
                await this.databases.deleteDocument(
                    variables.appwriteDatabaseId,
                    variables.appwriteCollectionId,
                    slug
                )
                return true;
            } catch (error) {
                throw error;
            }
        }

        async function getPost(slug) {
            try {
                return await this.databases.getDocument(
                    variables.appwriteDatabaseId,
                    variables.appwriteCollectionId,
                    slug
                )
            } catch (error) {
                throw error
            }
        }
        async function getPosts(queries = [Query.equal('status', 'active')]) {
            try {
                return await this.databases.listDocuments(
                    variables.appwriteDatabaseId,
                    variables.appwriteCollectionId,
                    queries
                )
            } catch (error) {
                throw error;
            }
        }

        async function uploadFile(file) {
            try {
                return await this.bucket.createFile(
                    variables.appwriteBucketId,
                    ID.unique(),
                    file
                )
            } catch (error) {
                throw error;
            }
        }
        async function deleteFile(fileId) {
            try {
                await this.bucket.deleteFile(
                    variables.appwriteBucketId,
                    fileId
                )
                return true;
            } catch (error) {
                throw error;
            }
        }
        function getFilePreviw(fileId){
            return this.bucket.getFilePreviw(
                variables.appwriteBucketId,
                fileId
            )
        }
    }
}
const service = new Service();
export default service;