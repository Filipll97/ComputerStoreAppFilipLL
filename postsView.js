// Get and Set functions for the data that is retrieved by the API 
let currentPost = [];

const getPosts = () => {
    return [...currentPost];
}

const setPost = (posts) => {
    currentPost = posts;
};

const postsView = {
    getPosts,
    setPost
};

export default postsView
