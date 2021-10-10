import { createContext, useReducer,useState } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // State
  const [postState, dispatch] = useReducer(postReducer, {
    post:null,
    posts: [],
    postsLoading: true,
  });
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast,setShowToast]=useState({
    show:false,
    message:''
  });
  // Get all posts
  const getPost = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({ type: "POST_LOAD_SUCCESS", payload: response.data.posts });
      }
    } catch (error) {
      dispatch({type:'POST_LOAD_FAIL'});
    }
  };
  // ADD POST
  const addPost = async (postForm) =>{
    try {
      const response = await axios.post(`${apiUrl}/posts`,postForm);
      if(response.data.success){
        dispatch({ type: "POST_ADD_SUCCESS", payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : {success: false,message: 'server error'}
    }
  } 
  // DELETEPOST
  const delPost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if(response.data.success){
        dispatch({type:'DELETE_POST_SUCCESS',payload: postId});
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  // FIND POST
  const findPost = async (postId) => {
    const post=postState.posts.find(post=>post._id===postId);
    if(post!==null){
      dispatch({type:'FIND_POST',payload:post});
    }
  }
  // UPDATEPOST
  const updatePost= async (updatePostForm)=>{
    try {
      const response= await axios.put(`${apiUrl}/posts/${updatePostForm._id}`,updatePostForm);
      if(response.data.success){
        dispatch({type:'UPDATE_POST_SUCCESS',payload: response.data.post});
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : {success: false,message: 'server error'}
    }
  }
  // showModal
  
  // Post context data 
  const postContextData ={
    postState,getPost,
    addPost,delPost,
    updatePost,findPost,
    showAddPostModal,setShowAddPostModal,
    showToast,setShowToast,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
