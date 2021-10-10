export const postReducer=(state,action)=>{
    const{type,payload}=action;
    switch(type){
        case 'POST_LOAD_SUCCESS':
            return {
                ...state,
                posts:payload,
                postsLoading:false
            }
        case 'POST_LOAD_FAIL':
            return {
                ...state,
                posts:[],
                postsLoading:false
            }
        case 'POST_ADD_SUCCESS':
            return {
                ...state,
                posts:[...state.posts,payload],
            }
        case 'DELETE_POST_SUCCESS':
            return {
                ...state,
                posts:state.posts.filter((post)=>{
                    return post._id!==payload;
                }),
            }
        case 'UPDATE_POST_SUCCESS':
            const newPosts=state.posts.map(post=>{
                if(post._id===payload._id) return payload;
                return post;
            })
            return {
                ...state,
                posts:newPosts
            }
        case 'FIND_POST':
            return{
                ...state,
                post:payload
            }
        default:
            return state
    }
}