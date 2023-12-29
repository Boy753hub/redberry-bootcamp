
import axios from 'axios';

export const BASE_PATH = "https://api.blog.redberryinternship.ge/api"

const my_token = 'f536d0424e8daa23ef0abe0827aa635d5d1547d949944f73ec790695eea88014'

export const API = axios.create({
    baseURL: "https://api.blog.redberryinternship.ge/api",
    headers: {
      "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${my_token}` 
    }
});

export const getCategories = async () => {
    try {
        return (await API.get("/categories")).data
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}
export const login = async (email) => {
    try {
      const response = await API.post("/login", {
        "email": email
      });
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  
  export const AddBlog = async (blog) => {
    try {
      return (await API.post("/blogs", blog)).data;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  };

  export const GetBlogs = async () => {
    try {
      return (await API.get('/blogs')).data;
    } catch (error) {
      console.error("Error getting blog:", error);
      throw error;
    }
  }

  export const GetBlogsById = async (id) => {
    try {
      return (await API.get(`/blogs/${id}`)).data;
    } catch (error) {
      console.error("Error getting blog:", error);
      throw error;
    }
  }