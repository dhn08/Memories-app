import axios from "axios";
const API = axios.create({ baseURL: "https://memories-dhn.herokuapp.com" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPostsByCreator = (name) =>
  API.get(`/posts/creator?name=${name}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatedPost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signin = (formData) => API.post("/user/signin", formData);
export const comment = (comment, id) =>
  API.post(`/posts/${id}/commentPost`, { comment });

export const signup = (formData) => API.post("/user/signup", formData);
